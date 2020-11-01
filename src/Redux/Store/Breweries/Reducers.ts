import { Brewery } from "../../../Interfaces/Brewery.types";
import {
  BreweryState,
  BreweryActionTypes,
  SET_NEW_BREWERY_NAME,
  SET_NEW_BREWERY_COUNTRY,
  SET_NEW_BREWERY_STATE,
  SET_NEW_BREWERY_CITY,
  FETCH_ALL_BREWERIES,
  WAIT_ON_BREWERIES_REQUEST,
} from "./Types";

const initialState: BreweryState = {
  isLoading: false,
  breweries: [],
};

const initialNewBrewery: Brewery = {
  _id: "",
  name: "",
  country: "",
};

export const breweryReducer = (state = initialState, action: BreweryActionTypes): BreweryState => {
  switch (action.type) {
    case SET_NEW_BREWERY_NAME:
      return {
        ...state,
        newBrewery: {
          ...initialNewBrewery,
          ...state.newBrewery,
          name: action.name,
        },
      };
    case SET_NEW_BREWERY_COUNTRY:
      return {
        ...state,
        newBrewery: {
          ...initialNewBrewery,
          ...state.newBrewery,
          country: action.country,
        },
      };
    case SET_NEW_BREWERY_STATE:
      return {
        ...state,
        newBrewery: {
          ...initialNewBrewery,
          ...state.newBrewery,
          state: action.state,
        },
      };
    case SET_NEW_BREWERY_CITY:
      return {
        ...state,
        newBrewery: {
          ...initialNewBrewery,
          ...state.newBrewery,
          city: action.city,
        },
      };
    case FETCH_ALL_BREWERIES:
      return {
        ...state,
        breweries: action.breweries,
      };
    case WAIT_ON_BREWERIES_REQUEST:
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
