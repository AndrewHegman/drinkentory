import {
  BreweryState,
  BreweryActionTypes,
  SET_NEW_BREWERY_NAME,
  SET_NEW_BREWERY_COUNTRY,
  SET_NEW_BREWERY_STATE,
  SET_NEW_BREWERY_CITY,
  FETCH_ALL_BREWERIES,
  Brewery,
} from "./Types";

const initialState: BreweryState = {
  breweries: [],
};

const initialNewBrewery: Brewery = {
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
    default:
      return state;
  }
};
