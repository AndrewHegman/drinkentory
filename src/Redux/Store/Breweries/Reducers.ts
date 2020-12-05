import { BreweryDocument, CountryDocument, NewBrewery } from "../../../Interfaces";
import { BreweryState, BreweryActionTypes, actionTypes } from "./Types";

const initialState: BreweryState = {
  isLoading: false,
  breweries: [],
};

const initialNewBrewery: NewBrewery = {
  name: "",
  country: "",
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
    case actionTypes.SET_NEW_BREWERY_COUNTRY:
      return {
        ...state,
        newBrewery: {
          ...initialNewBrewery,
          ...state.newBrewery,
          country: action.country,
        },
      };
    case actionTypes.SET_NEW_BREWERY_STATE:
      return {
        ...state,
        newBrewery: {
          ...initialNewBrewery,
          ...state.newBrewery,
          state: action.state,
        },
      };
    case actionTypes.SET_NEW_BREWERY_CITY:
      return {
        ...state,
        newBrewery: {
          ...initialNewBrewery,
          ...state.newBrewery,
          city: action.city,
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
    default:
      return state;
  }
};
