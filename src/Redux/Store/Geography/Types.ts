import { PlaceDocument } from "../../../Interfaces";
import { ActionType } from "../../Common";

export const actionTypes = {
  WAIT_ON_ADD_PLACE: "WAIT_ON_ADD_PLACE",
  ADD_PLACE_FINISHED: "ADD_PLACE_FINISHED",

  INITIALIZE_PLACES_SERVICE: "INITIALIZE_PLACES_SERVICE",
  INITIALIZE_GEOCODING_SERVICE: "INITIALIZE_GEOCODING_SERVICE",
  WAIT_ON_GET_PLACE_FROM_SUGGESTION: "WAIT_ON_GET_PLACE_FROM_SUGGESTION",
  GET_PLACE_FROM_SUGGESTION_FINISHED: "GET_PLACE_FROM_SUGGESTION_FINISHED",

  WAIT_ON_FETCH_ALL_PLACES: "WAIT_ON_FETCH_ALL_PLACES",
  FETCH_ALL_PLACES_FINISHED: "FETCH_ALL_PLACES_FINISHED",
} as const;

export interface GeographyState {
  places: PlaceDocument[];
  newPlace: PlaceDocument;

  placesService: google.maps.places.PlacesService;
  geocoderService: google.maps.Geocoder;

  isDetailsFromSuggestionLoading: boolean;
  isLoadingPlaces: boolean;
}

export const GeographyActions = {
  initializePlacesService: (service: google.maps.places.PlacesService) =>
    ({
      type: actionTypes.INITIALIZE_PLACES_SERVICE,
      service,
    } as const),
  initializeGeocodingService: (service: google.maps.Geocoder) =>
    ({
      type: actionTypes.INITIALIZE_GEOCODING_SERVICE,
      service,
    } as const),

  waitOnGetPlaceFromSuggestion: () =>
    ({
      type: actionTypes.WAIT_ON_GET_PLACE_FROM_SUGGESTION,
    } as const),

  getPlaceFromSuggestionFinished: (place: PlaceDocument) =>
    ({
      type: actionTypes.GET_PLACE_FROM_SUGGESTION_FINISHED,
      place,
    } as const),

  waitOnFetchAllPlaces: () =>
    ({
      type: actionTypes.WAIT_ON_FETCH_ALL_PLACES,
    } as const),
  fetchAllPlacesFinished: (places: PlaceDocument[]) =>
    ({
      type: actionTypes.FETCH_ALL_PLACES_FINISHED,
      places,
    } as const),

  waitOnAddPlace: () =>
    ({
      type: actionTypes.WAIT_ON_ADD_PLACE,
    } as const),

  addPlaceFinished: (place: PlaceDocument) =>
    ({
      type: actionTypes.ADD_PLACE_FINISHED,
      place,
    } as const),
};

export type GeographyActionTypes = ActionType<typeof GeographyActions>;
