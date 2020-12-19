import Axios from "axios";
import { GeographyActionTypes, actionTypes, GeographyActions } from "./Types";
import { ThunkAction } from "redux-thunk";
import { CreateCityDto } from "../../../Interfaces";
import { RootState } from "../index";

const getPlaceId = (geocoderService: google.maps.Geocoder, geocoderRequest: google.maps.GeocoderRequest): Promise<string> => {
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
  initializePlacesService: (): GeographyActionTypes => {
    return GeographyActions.initializePlacesService(new google.maps.places.PlacesService(document.createElement("div")));
  },
  initializeGeocodingService: (): GeographyActionTypes => {
    return GeographyActions.initializeGeocodingService(new google.maps.Geocoder());
  },

  fetchAllCountries: (): ThunkAction<Promise<GeographyActionTypes>, {}, {}, GeographyActionTypes> => {
    return (dispatch) => {
      dispatch(GeographyActions.waitOnCountriesRequest());
      return Axios.get("http://localhost:3002/v1/country").then((res) => dispatch(GeographyActions.fetchCountriesReceived(res.data)));
    };
  },

  fetchAllStates: (): ThunkAction<Promise<GeographyActionTypes>, {}, {}, GeographyActionTypes> => {
    return (dispatch) => {
      dispatch(GeographyActions.waitOnStatesRequest());
      return Axios.get("http://localhost:3002/v1/state").then((res) => dispatch(GeographyActions.fetchStatesReceived(res.data)));
    };
  },

  fetchAllCities: (): ThunkAction<Promise<GeographyActionTypes>, {}, {}, GeographyActionTypes> => {
    return (dispatch) => {
      dispatch(GeographyActions.waitOnCitiesRequest());
      return Axios.get("http://localhost:3002/v1/city").then((res) => dispatch(GeographyActions.fetchCitiesReceived(res.data)));
    };
  },

  addNewCity: (city: CreateCityDto): ThunkAction<Promise<GeographyActionTypes>, {}, {}, GeographyActionTypes> => {
    return (dispatch) => {
      dispatch(GeographyActions.waitOnCreateCity());
      return Axios.post("http://localhost:3002/v1/city", city).then((res) => dispatch(GeographyActions.createCityFinished()));
    };
  },

  getDetailsFromSuggestion: (
    name: string,
    suggestion: google.maps.places.PlaceDetailsRequest
  ): ThunkAction<Promise<GeographyActionTypes>, RootState, {}, GeographyActionTypes> => {
    return (dispatch, getStore) => {
      const store = getStore();
      if (!store.geography.placesService) {
        return Promise.reject("Places service is not initialized. Did you forget to initialize it?");
      }

      if (!store.geography.geocoderService) {
        return Promise.reject("Geocoder service is not initialized. Did you forget to initialize it?");
      }

      dispatch(GeographyActions.waitOnGetDetailsFromSuggestion());
      return new Promise((resolve, reject) => {
        return store.geography.placesService.getDetails(suggestion, (_result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            const country = _result.address_components?.find((component) => component.types.includes("country"));
            const locality = _result.address_components?.find((component) => component.types.includes("administrative_area_level_1"));

            if (!country) {
              reject(`Unable to find a 'country' value for provided suggestion`);
            }

            if (!locality) {
              console.warn(`Unable to find an 'administrative_area_level_1' value for provided suggestion`);
            }

            const promises = [
              getPlaceId(store.geography.geocoderService, { componentRestrictions: { country: country?.short_name } }),
              getPlaceId(store.geography.geocoderService, { componentRestrictions: { locality: locality?.short_name } }),
            ];

            Promise.all(promises).then((results) => {
              const countryDocument = {
                _id: results[0],
                name: country!.long_name, // we reject if no country is found
              };
              const stateDocument = {
                _id: results[1],
                country: countryDocument,
                name: locality?.long_name || "",
              };
              const cityDocument = {
                _id: suggestion.placeId,
                state: stateDocument,
                name,
              };
              resolve(
                dispatch(
                  GeographyActions.getDetailsFromSuggestionReceived({
                    country: countryDocument,
                    state: stateDocument,
                    city: cityDocument,
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
