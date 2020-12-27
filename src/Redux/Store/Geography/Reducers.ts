import { GeographyState, actionTypes, GeographyActionTypes } from "./Types";

const initialState: GeographyState = {
  isCountriesLoading: false,
  isStatesLoading: false,
  isCitiesLoading: false,

  // isCountriesOld: true,
  // isStatesOld: true,
  // isCitiesOld: true,

  places: [],

  isDetailsFromSuggestionLoading: false,

  placesService: null as any,
  geocoderService: null as any,

  isWaitingOnRequest: false,
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
      };
    case actionTypes.FETCH_STATES_RECEIVED:
      return {
        ...state,
        isStatesLoading: false,
        // isStatesOld: false,
      };
    case actionTypes.FETCH_CITIES_RECEIVED:
      return {
        ...state,
        isCitiesLoading: false,
        // isCitiesOld: false,
      };
    // case actionTypes.CREATE_CITY_FINISHED:
    //   return {
    //     ...state,
    //     cities: [],
    //   };
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
    // Switching to using the places interface means this is no longer relevant...I think
    // case actionTypes.GET_DETAILS_FROM_SUGGESTION_RECEIVED:
    //   return {
    //     ...state,
    //     countries: [...state.countries, action.details.country],
    //     states: [...state.states, action.details.state],
    //     cities: [...state.cities, action.details.city],
    //     isDetailsFromSuggestionLoading: false
    //   };
    case actionTypes.WAIT_ON_ADD_COUNTRY:
      return {
        ...state,
        isWaitingOnRequest: true,
      };
    case actionTypes.ADD_COUNTRY_FINISHED:
      return {
        ...state,
        isWaitingOnRequest: false,
      };
    default:
      return state;
  }
};
