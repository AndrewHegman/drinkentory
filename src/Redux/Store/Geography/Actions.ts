import Axios, { AxiosError } from "axios";
import { GeographyActionTypes, actionTypes, GeographyActions } from "./Types";
import { CommonActions, CommonActionTypes } from "../Common/Types";
import { formatErrorMessage } from "../../Common";
import { ThunkAction } from "redux-thunk";
import { AddCityDto, AddCountryDto, CountryDocument, AddStateDto, AddPlaceDto } from "../../../Interfaces";
import { RootState } from "../index";
import { BreweryActions, BreweryActionTypes } from "../Breweries/Types";
import { ObjectId } from "mongodb";
import { count } from "console";

const usShortName = "US";

const getPlaceId = (
  geocoderService: google.maps.Geocoder,
  geocoderRequest: google.maps.GeocoderRequest
): Promise<string> => {
  return new Promise((resolve, reject) => {
    geocoderService.geocode(geocoderRequest, (result, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        resolve(result[0].place_id);
      } else {
        reject(`Geocoder error\n\tRequest: ${geocoderRequest.componentRestrictions}\n\tStatus: ${status}`);
      }
    });
  });
};

export const geography = {
  initializePlacesService: (): ThunkAction<GeographyActionTypes, RootState, {}, GeographyActionTypes> => {
    return (dispatch, getState) => {
      const state = getState();

      return dispatch(
        GeographyActions.initializePlacesService(
          state.geography.placesService || new google.maps.places.PlacesService(document.createElement("div"))
        )
      );
    };
  },
  initializeGeocodingService: (): ThunkAction<GeographyActionTypes, RootState, {}, GeographyActionTypes> => {
    return (dispatch, getState) => {
      const state = getState();
      return dispatch(
        GeographyActions.initializeGeocodingService(state.geography.geocoderService || new google.maps.Geocoder())
      );
    };
  },

  fetchAllCountries: (): ThunkAction<
    Promise<GeographyActionTypes | CommonActionTypes>,
    {},
    {},
    GeographyActionTypes | CommonActionTypes
  > => {
    return (dispatch) => {
      dispatch(GeographyActions.waitOnCountriesRequest());
      return Axios.get("http://localhost:3002/v1/country")
        .then((res) => dispatch(GeographyActions.fetchCountriesReceived(res.data)))
        .catch((res) => {
          return dispatch(CommonActions.setNetworkError(`Error code`));
        });
    };
  },

  fetchAllStates: (): ThunkAction<Promise<GeographyActionTypes>, {}, {}, GeographyActionTypes> => {
    return (dispatch) => {
      dispatch(GeographyActions.waitOnStatesRequest());
      return Axios.get("http://localhost:3002/v1/state").then((res) =>
        dispatch(GeographyActions.fetchStatesReceived(res.data))
      );
    };
  },

  fetchAllCities: (): ThunkAction<Promise<GeographyActionTypes>, {}, {}, GeographyActionTypes> => {
    return (dispatch) => {
      dispatch(GeographyActions.waitOnCitiesRequest());
      return Axios.get("http://localhost:3002/v1/city").then((res) =>
        dispatch(GeographyActions.fetchCitiesReceived(res.data))
      );
    };
  },

  addNewCity: (
    city: AddCityDto
  ): ThunkAction<Promise<GeographyActionTypes | CommonActionTypes>, {}, {}, GeographyActionTypes | CommonActionTypes> => {
    return (dispatch) => {
      dispatch(GeographyActions.waitOnAddCity());
      return Axios.post("http://localhost:3002/v1/city", city)
        .then((res) => dispatch(GeographyActions.addCityFinished(res.data)))
        .catch((error: AxiosError) => dispatch(CommonActions.setNetworkError(formatErrorMessage(error))));
    };
  },

  addNewState: (
    state: AddStateDto
  ): ThunkAction<Promise<GeographyActionTypes | CommonActionTypes>, {}, {}, GeographyActionTypes | CommonActionTypes> => {
    return (dispatch) => {
      dispatch(GeographyActions.waitOnAddState());
      return Axios.post("http://localhost:3002/v1/state", state)
        .then((res) => dispatch(GeographyActions.addStateFinished(res.data)))
        .catch((error: AxiosError) => dispatch(CommonActions.setNetworkError(formatErrorMessage(error))));
    };
  },

  addNewCountry: (
    newCountry: AddCountryDto
  ): ThunkAction<
    Promise<GeographyActionTypes | CommonActionTypes>,
    RootState,
    {},
    GeographyActionTypes | CommonActionTypes
  > => {
    return (dispatch) => {
      dispatch(GeographyActions.waitOnAddCountry());
      return Axios.post("http://localhost:3002/v1/country", newCountry)
        .then((res) => dispatch(GeographyActions.addCountryFinished(res.data)))
        .catch((error: AxiosError) => dispatch(CommonActions.setNetworkError(formatErrorMessage(error))));
    };
  },

  addNewPlace: function (
    place: AddPlaceDto
  ): ThunkAction<
    Promise<GeographyActionTypes | CommonActionTypes>,
    RootState,
    {},
    GeographyActionTypes | CommonActionTypes
  > {
    return (dispatch, getState) => {
      // TODO: Check if place already exists before adding--duplicates are handled by the backend, but it would be better performance to not do unnecessary requests
      dispatch(GeographyActions.waitOnAddPlace());
      const promises = [dispatch(this.addNewCountry(place.country))];
      if (place.state) {
        promises.push(dispatch(this.addNewState(place.state)));
      }
      // if (place) {
      //   promises.push(dispatch(this.addNewPlace(place)));
      // }

      return Promise.all(promises).then(() => {
        return dispatch(GeographyActions.addPlaceFinished());
      });
    };
  },

  setNewBreweryLocationFromSuggestion: (
    name: string,
    suggestion: google.maps.places.PlaceDetailsRequest
  ): ThunkAction<Promise<BreweryActionTypes>, RootState, {}, BreweryActionTypes> => {
    return (dispatch, getStore) => {
      const store = getStore();
      if (!store.geography.placesService) {
        return Promise.reject("Places service is not initialized. Did you forget to initialize it?");
      }

      if (!store.geography.geocoderService) {
        return Promise.reject("Geocoder service is not initialized. Did you forget to initialize it?");
      }

      dispatch(BreweryActions.waitOnUpdatingNewBreweryLocation());
      return new Promise((resolve, reject) => {
        return store.geography.placesService.getDetails(suggestion, (_result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            const country = _result.address_components?.find((component) => component.types.includes("country"));
            const locality = _result.address_components?.find((component) =>
              component.types.includes("administrative_area_level_1")
            );

            if (!country) {
              reject(`Unable to find a 'country' value for provided suggestion`);
            }

            if (!locality) {
              console.warn(`Unable to find an 'administrative_area_level_1' value for provided suggestion`);
            }

            const promises = [
              getPlaceId(store.geography.geocoderService, {
                componentRestrictions: { country: country?.short_name },
              }),
              getPlaceId(store.geography.geocoderService, {
                componentRestrictions: { locality: locality?.short_name },
              }),
            ];

            Promise.all(promises).then((results) => {
              console.log(results[0]);
              const countryDocument = {
                name: country!.long_name, // we reject if no country is found
                placesId: results[0],
              };

              // Only include state if we are in the US
              const stateDocument =
                country!.short_name.toUpperCase() === usShortName.toUpperCase()
                  ? {
                      placesId: results[1],
                      country: countryDocument,
                      name: locality?.long_name || "",
                    }
                  : undefined;

              resolve(
                dispatch(
                  BreweryActions.updatingNewBreweryLocationFinished({
                    name,
                    placesId: suggestion.placeId,
                    country: countryDocument,
                    state: stateDocument,
                  })
                )
              );
            });
          } else {
            reject(status);
          }
        });
      });
    };
  },
} as const;
