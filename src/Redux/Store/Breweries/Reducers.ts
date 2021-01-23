import { NewBrewery, PlaceDocument } from "../../../Interfaces";
import { BreweryState, BreweryActionTypes, actionTypes } from "./Types";

const initialNewBrewery: NewBrewery = {
  name: "",
  place: {} as PlaceDocument,
};

export const initialState: BreweryState = {
  isBreweriesLoading: false,
  breweries: [],
  updatingNewBreweryLocation: false,
  newBrewery: initialNewBrewery,
  isCreatingNewBrewery: false,
};

export const breweryReducer = (state = initialState, action: BreweryActionTypes): BreweryState => {
  switch (action.type) {
    case actionTypes.SET_NEW_BREWERY_NAME:
      return {
        ...state,
        newBrewery: {
          ...initialNewBrewery,
          ...state.newBrewery,
          name: action.name,
        },
      };

    case actionTypes.SET_NEW_BREWERY_PLACE:
      return {
        ...state,
        newBrewery: {
          ...initialNewBrewery,
          ...state.newBrewery,
          place: action.place,
        },
      };
    case actionTypes.WAIT_ON_FETCH_ALL_BREWERIES:
      return {
        ...state,
        isBreweriesLoading: true,
      };
    case actionTypes.FETCH_ALL_BREWERIES_FINISHED:
      return {
        ...state,
        isBreweriesLoading: false,
        breweries: action.breweries,
      };

    case actionTypes.RESET_NEW_BREWERY:
      return {
        ...state,
        newBrewery: initialNewBrewery,
      };
    case actionTypes.UPDATING_NEW_BREWERY_LOCATION_FINISHED:
      return {
        ...state,
        updatingNewBreweryLocation: false,
      };
    case actionTypes.WAIT_ON_UPDATING_NEW_BREWERY_LOCATION:
      return {
        ...state,
        updatingNewBreweryLocation: true,
      };
    case actionTypes.WAIT_ON_CREATE_NEW_BREWERY:
      return {
        ...state,
        isCreatingNewBrewery: true,
      };
    case actionTypes.CREATE_NEW_BREWERY_FINISHED:
      return {
        ...state,
        isCreatingNewBrewery: false,
        breweries: [...state.breweries, action.brewery],
      };
    default:
      return state;
  }
};
