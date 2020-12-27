import { PlaceDocument, CityDocument, CountryDocument, StateDocument } from "../../../Interfaces";
import { ActionType } from "../../Common";

export const actionTypes = {
  WAIT_ON_COUNTRIES_REQUEST: "WAIT_ON_COUNTRIES_REQUEST",
  WAIT_ON_STATES_REQUEST: "WAIT_ON_STATES_REQUEST",
  WAIT_ON_CITIES_REQUEST: "WAIT_ON_CITIES_REQUEST",

  FETCH_COUNTRIES_RECEIVED: "FETCH_COUNTRIES_RECEIVED",
  FETCH_STATES_RECEIVED: "FETCH_STATES_RECEIVED",
  FETCH_CITIES_RECEIVED: "FETCH_CITIES_RECEIVED",

  WAIT_ON_ADD_COUNTRY: "WAIT_ON_ADD_COUNTRY",
  ADD_COUNTRY_FINISHED: "ADD_COUNTRY_FINISHED",

  WAIT_ON_ADD_STATE: "WAIT_ON_ADD_STATE",
  ADD_STATE_FINISHED: "ADD_STATE_FINISHED",

  WAIT_ON_CREATE_CITY: "WAIT_ON_CREATE_CITY",
  CREATE_CITY_FINISHED: "CREATE_CITY_FINISHED",

  WAIT_ON_ADD_PLACE: "WAIT_ON_ADD_PLACE",
  ADD_PLACE_FINISHED: "ADD_PLACE_FINISHED",

  INITIALIZE_PLACES_SERVICE: "INITIALIZE_PLACES_SERVICE",
  INITIALIZE_GEOCODING_SERVICE: "INITIALIZE_GEOCODING_SERVICE",
  WAIT_ON_GET_DETAILS_FROM_SUGGESTION: "WAIT_ON_GET_DETAILS_FROM_SUGGESTION",
  GET_DETAILS_FROM_SUGGESTION_RECEIVED: "GET_DETAILS_FROM_SUGGESTION_RECEIVED",
} as const;

type LocationDetails = {
  country: CountryDocument;
  state: StateDocument;
  city: CityDocument;
};

export interface GeographyState {
  isCountriesLoading: boolean;
  isStatesLoading: boolean;
  isCitiesLoading: boolean;

  // isCountriesOld: boolean;
  // isStatesOld: boolean;
  // isCitiesOld: boolean;

  places: PlaceDocument[];

  isDetailsFromSuggestionLoading: boolean;

  placesService: google.maps.places.PlacesService;
  geocoderService: google.maps.Geocoder;

  isWaitingOnRequest: boolean;
}

export const GeographyActions = {
  waitOnCountriesRequest: () =>
    ({
      type: actionTypes.WAIT_ON_COUNTRIES_REQUEST,
    } as const),
  waitOnStatesRequest: () =>
    ({
      type: actionTypes.WAIT_ON_STATES_REQUEST,
    } as const),
  waitOnCitiesRequest: () =>
    ({
      type: actionTypes.WAIT_ON_CITIES_REQUEST,
    } as const),
  fetchCountriesReceived: (countries: CountryDocument[]) =>
    ({
      type: actionTypes.FETCH_COUNTRIES_RECEIVED,
      data: countries,
    } as const),
  fetchStatesReceived: (states: StateDocument[]) =>
    ({
      type: actionTypes.FETCH_STATES_RECEIVED,
      data: states,
    } as const),
  fetchCitiesReceived: (cities: CityDocument[]) =>
    ({
      type: actionTypes.FETCH_CITIES_RECEIVED,
      data: cities,
    } as const),

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

  waitOnGetDetailsFromSuggestion: () =>
    ({
      type: actionTypes.WAIT_ON_GET_DETAILS_FROM_SUGGESTION,
    } as const),

  getDetailsFromSuggestionReceived: (details: LocationDetails) =>
    ({
      type: actionTypes.GET_DETAILS_FROM_SUGGESTION_RECEIVED,
      details,
    } as const),

  waitOnAddCountry: () =>
    ({
      type: actionTypes.WAIT_ON_ADD_COUNTRY,
    } as const),

  addCountryFinished: (country: CountryDocument) =>
    ({
      type: actionTypes.ADD_COUNTRY_FINISHED,
      country,
    } as const),

  waitOnAddState: () =>
    ({
      type: actionTypes.WAIT_ON_ADD_STATE,
    } as const),

  addStateFinished: (state: StateDocument) =>
    ({
      type: actionTypes.ADD_STATE_FINISHED,
      state,
    } as const),

  waitOnAddCity: () =>
    ({
      type: actionTypes.WAIT_ON_CREATE_CITY,
    } as const),
  addCityFinished: (city: CityDocument) =>
    ({
      type: actionTypes.CREATE_CITY_FINISHED,
      city,
    } as const),

  waitOnAddPlace: () =>
    ({
      type: actionTypes.WAIT_ON_ADD_PLACE,
    } as const),

  addPlaceFinished: () =>
    ({
      type: actionTypes.ADD_PLACE_FINISHED,
    } as const),
};

export type GeographyActionTypes = ActionType<typeof GeographyActions>;
