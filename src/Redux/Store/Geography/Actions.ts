import Axios, { AxiosError } from "axios";
import { GeographyActionTypes, GeographyActions } from "./Types";
import { CommonActions, CommonActionTypes } from "../Common/Types";
import { formatErrorMessage } from "../../Common";
import { ThunkAction } from "redux-thunk";
import { PlaceDocument } from "../../../Interfaces";
import { RootState } from "../index";
import { ObjectId } from "mongodb";
import { selectors } from "../..";

const usShortName = "US";

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
  fetchAllPlaces: (): ThunkAction<Promise<GeographyActionTypes>, RootState, {}, GeographyActionTypes> => {
    return (dispatch, getState) => {
      const { geography, common } = getState();
      const { places } = geography;

      if (places.length > 0) {
        return Promise.resolve(dispatch(GeographyActions.fetchAllPlacesFinished(places)));
      }
      dispatch(GeographyActions.waitOnFetchAllPlaces());
      return Axios.get(`${common.serverAddress}/v1/place`).then((res) => dispatch(GeographyActions.fetchAllPlacesFinished(res.data)));
    };
  },

  initializePlacesService: (): ThunkAction<GeographyActionTypes, RootState, {}, GeographyActionTypes> => {
    return (dispatch, getState) => {
      const state = getState();

      return dispatch(
        GeographyActions.initializePlacesService(state.geography.placesService || new google.maps.places.PlacesService(document.createElement("div")))
      );
    };
  },
  initializeGeocodingService: (): ThunkAction<GeographyActionTypes, RootState, {}, GeographyActionTypes> => {
    return (dispatch, getState) => {
      const state = getState();
      return dispatch(GeographyActions.initializeGeocodingService(state.geography.geocoderService || new google.maps.Geocoder()));
    };
  },

  addNewPlace: (
    place: PlaceDocument
  ): ThunkAction<Promise<GeographyActionTypes | CommonActionTypes | void>, RootState, {}, GeographyActionTypes | CommonActionTypes> => {
    return (dispatch, getState) => {
      const _place = selectors.geography.placeByPlaceId(getState(), place.placesId);
      if (_place) {
        return Promise.resolve();
      }
      dispatch(GeographyActions.waitOnAddPlace());
      const { serverAddress } = getState().common;
      return Axios.post(`${serverAddress}/v1/place`, place)
        .then((res) => dispatch(GeographyActions.addPlaceFinished(res.data)))
        .catch((error: AxiosError) => dispatch(CommonActions.setNetworkError(formatErrorMessage(error))));
    };
  },

  getPlaceFromSuggestion: (
    name: string,
    suggestion: google.maps.places.PlaceDetailsRequest
  ): ThunkAction<Promise<ReturnType<typeof GeographyActions.getPlaceFromSuggestionFinished>>, RootState, {}, GeographyActionTypes> => {
    return (dispatch, getStore) => {
      const store = getStore();
      if (!store.geography.placesService) {
        return Promise.reject("Places service is not initialized. Did you forget to initialize it?");
      }

      if (!store.geography.geocoderService) {
        return Promise.reject("Geocoder service is not initialized. Did you forget to initialize it?");
      }

      const place = selectors.geography.placeByPlaceId(store, suggestion.placeId);
      if (place) {
        return Promise.resolve(dispatch(GeographyActions.getPlaceFromSuggestionFinished(place)));
      }

      dispatch(GeographyActions.waitOnGetPlaceFromSuggestion());
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
              getPlaceId(store.geography.geocoderService, {
                componentRestrictions: { country: country?.short_name },
              }),
              getPlaceId(store.geography.geocoderService, {
                componentRestrictions: { locality: locality?.short_name },
              }),
            ];

            Promise.all(promises).then((results) => {
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
                  GeographyActions.getPlaceFromSuggestionFinished({
                    _id: new ObjectId().toHexString(),
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
