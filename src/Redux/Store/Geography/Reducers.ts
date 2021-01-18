import { GeographyState, actionTypes, GeographyActionTypes } from "./Types";
import { PlaceDocument } from "../../../Interfaces";

export const initialState: GeographyState = {
  places: [],
  newPlace: {} as PlaceDocument,

  isDetailsFromSuggestionLoading: false,

  placesService: null as any,
  geocoderService: null as any,

  isLoadingPlaces: false,
};

export const geographyReducer = (state = initialState, action: GeographyActionTypes): GeographyState => {
  switch (action.type) {
    case actionTypes.INITIALIZE_PLACES_SERVICE:
      return {
        ...state,
        placesService: action.service,
      };
    case actionTypes.INITIALIZE_GEOCODING_SERVICE:
      return {
        ...state,
        geocoderService: action.service,
      };
    case actionTypes.WAIT_ON_FETCH_ALL_PLACES:
      return {
        ...state,
        isLoadingPlaces: true,
      };
    case actionTypes.FETCH_ALL_PLACES_FINISHED:
      return {
        ...state,
        isLoadingPlaces: false,
        places: [...action.places],
      };
    case actionTypes.WAIT_ON_GET_PLACE_FROM_SUGGESTION:
      return {
        ...state,
        isDetailsFromSuggestionLoading: true,
      };

    case actionTypes.GET_PLACE_FROM_SUGGESTION_FINISHED:
      return {
        ...state,
        newPlace: action.place,
      };
    case actionTypes.ADD_PLACE_FINISHED:
      return {
        ...state,
        places: [...state.places, action.place],
      };

    default:
      return state;
  }
};
