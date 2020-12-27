import { BreweryDocument, CountryDocument, NewBrewery, PlaceDocument } from "../../../Interfaces";
import { BreweryState, BreweryActionTypes, actionTypes } from "./Types";

const initialNewBrewery: NewBrewery = {
  name: "",
  place: {} as PlaceDocument,
};

const initialState: BreweryState = {
  isLoading: false,
  breweries: [],
  updatingNewBreweryLocation: false,
  newBrewery: initialNewBrewery,
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
    // case actionTypes.SET_NEW_BREWERY_COUNTRY:
    //   return {
    //     ...state,
    //     newBrewery: {
    //       ...initialNewBrewery,
    //       ...state.newBrewery,
    //       country: action.country
    //     }
    //   };
    // case actionTypes.SET_NEW_BREWERY_STATE:
    //   return {
    //     ...state,
    //     newBrewery: {
    //       ...initialNewBrewery,
    //       ...state.newBrewery,
    //       state: action.state
    //     }
    //   };
    // case actionTypes.SET_NEW_BREWERY_CITY:
    //   return {
    //     ...state,
    //     newBrewery: {
    //       ...initialNewBrewery,
    //       ...state.newBrewery,
    //       city: action.city
    //     }
    //   };
    case actionTypes.SET_NEW_BREWERY_PLACE:
      return {
        ...state,
        newBrewery: {
          ...initialNewBrewery,
          ...state.newBrewery,
          place: action.place,
        },
      };
    case actionTypes.WAIT_ON_BREWERIES_REQUEST:
      if (action.fieldToUpdate) {
        return {
          ...state,
          isLoading: action.isLoading,
          [action.fieldToUpdate]: action.payload,
        };
      }
      return {
        ...state,
        isLoading: action.isLoading,
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
        newBrewery: {
          ...initialNewBrewery,
          ...state.newBrewery,
          place: action.place,
        },
      };
    case actionTypes.WAIT_ON_UPDATING_NEW_BREWERY_LOCATION:
      return {
        ...state,
        updatingNewBreweryLocation: true,
      };
    default:
      return state;
  }
};
