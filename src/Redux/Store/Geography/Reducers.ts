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

  isDetailsFromSuggestionLoading: false,

  placesService: null as any,
  geocoderService: null as any,
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
    case actionTypes.WAIT_ON_GET_DETAILS_FROM_SUGGESTION:
      return {
        ...state,
        isDetailsFromSuggestionLoading: true,
      };
    case actionTypes.GET_DETAILS_FROM_SUGGESTION_RECEIVED:
      return {
        ...state,
        countries: [...state.countries, action.details.country],
        states: [...state.states, action.details.state],
        cities: [...state.cities, action.details.city],
        isDetailsFromSuggestionLoading: false,
      };
    default:
      return state;
  }
};
