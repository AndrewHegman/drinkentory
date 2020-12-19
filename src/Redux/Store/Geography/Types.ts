import { CityDocument, CountryDocument, StateDocument } from "../../../Interfaces";

export const actionTypes = {
  WAIT_ON_COUNTRIES_REQUEST: "WAIT_ON_COUNTRIES_REQUEST",
  WAIT_ON_STATES_REQUEST: "WAIT_ON_STATES_REQUEST",
  WAIT_ON_CITIES_REQUEST: "WAIT_ON_CITIES_REQUEST",

  WAIT_ON_CREATE_CITY: "WAIT_ON_CREATE_CITY",

  FETCH_COUNTRIES_RECEIVED: "FETCH_COUNTRIES_RECEIVED",
  FETCH_STATES_RECEIVED: "FETCH_STATES_RECEIVED",
  FETCH_CITIES_RECEIVED: "FETCH_CITIES_RECEIVED",

  CREATE_CITY_FINISHED: "CREATE_CITY_FINISHED",

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

  countries: CountryDocument[];
  states: StateDocument[];
  cities: CityDocument[];

  isDetailsFromSuggestionLoading: boolean;

  placesService: google.maps.places.PlacesService;
  geocoderService: google.maps.Geocoder;
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
  waitOnCreateCity: () =>
    ({
      type: actionTypes.WAIT_ON_CREATE_CITY,
    } as const),
  createCityFinished: () => ({
    type: actionTypes.CREATE_CITY_FINISHED,
  }),

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

  waitOnGetDetailsFromSuggestion: () => ({
    type: actionTypes.WAIT_ON_GET_DETAILS_FROM_SUGGESTION,
  }),

  getDetailsFromSuggestionReceived: (details: LocationDetails) => ({
    type: actionTypes.GET_DETAILS_FROM_SUGGESTION_RECEIVED,
    details,
  }),
};

export type GeographyActionTypes =
  | ReturnType<typeof GeographyActions.waitOnCountriesRequest>
  | ReturnType<typeof GeographyActions.waitOnStatesRequest>
  | ReturnType<typeof GeographyActions.waitOnCitiesRequest>
  | ReturnType<typeof GeographyActions.fetchCountriesReceived>
  | ReturnType<typeof GeographyActions.fetchStatesReceived>
  | ReturnType<typeof GeographyActions.fetchCitiesReceived>
  | ReturnType<typeof GeographyActions.waitOnCreateCity>
  | ReturnType<typeof GeographyActions.createCityFinished>
  | ReturnType<typeof GeographyActions.initializePlacesService>
  | ReturnType<typeof GeographyActions.initializePlacesService>
  | ReturnType<typeof GeographyActions.initializeGeocodingService>
  | ReturnType<typeof GeographyActions.waitOnGetDetailsFromSuggestion>
  | ReturnType<typeof GeographyActions.getDetailsFromSuggestionReceived>;
