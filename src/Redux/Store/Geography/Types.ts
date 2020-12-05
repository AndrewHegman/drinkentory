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
} as const;

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
};

export type GeographyActionTypes =
  | ReturnType<typeof GeographyActions.waitOnCountriesRequest>
  | ReturnType<typeof GeographyActions.waitOnStatesRequest>
  | ReturnType<typeof GeographyActions.waitOnCitiesRequest>
  | ReturnType<typeof GeographyActions.fetchCountriesReceived>
  | ReturnType<typeof GeographyActions.fetchStatesReceived>
  | ReturnType<typeof GeographyActions.fetchCitiesReceived>
  | ReturnType<typeof GeographyActions.waitOnCreateCity>
  | ReturnType<typeof GeographyActions.createCityFinished>;
