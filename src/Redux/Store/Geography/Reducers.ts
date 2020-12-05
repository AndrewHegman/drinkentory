import { GeographyState, actionTypes, GeographyActionTypes } from "./Types";

const initialState: GeographyState = {
  isCountriesLoading: false,
  isStatesLoading: false,
  isCitiesLoading: false,

  // isCountriesOld: true,
  // isStatesOld: true,
  // isCitiesOld: true,

  countries: [],
  states: [],
  cities: [],
};

export const geographyReducer = (state = initialState, action: GeographyActionTypes): GeographyState => {
  switch (action.type) {
    case actionTypes.WAIT_ON_COUNTRIES_REQUEST:
      return {
        ...state,
        isCountriesLoading: true,
      };
    case actionTypes.WAIT_ON_STATES_REQUEST:
      return {
        ...state,
        isStatesLoading: true,
      };
    case actionTypes.WAIT_ON_CITIES_REQUEST:
      return {
        ...state,
        isCitiesLoading: true,
      };
    case actionTypes.FETCH_COUNTRIES_RECEIVED:
      return {
        ...state,
        isCountriesLoading: false,
        // isCountriesOld: false,
        countries: action.data,
      };
    case actionTypes.FETCH_STATES_RECEIVED:
      return {
        ...state,
        isStatesLoading: false,
        // isStatesOld: false,
        states: action.data,
      };
    case actionTypes.FETCH_CITIES_RECEIVED:
      return {
        ...state,
        isCitiesLoading: false,
        // isCitiesOld: false,
        cities: action.data,
      };
    case actionTypes.CREATE_CITY_FINISHED:
      return {
        ...state,
        cities: [],
      };
    case actionTypes.WAIT_ON_CREATE_CITY:
      return {
        ...state,
        isCitiesLoading: true,
      };
    default:
      return state;
  }
};
