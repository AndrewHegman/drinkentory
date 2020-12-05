import Axios from "axios";
import { GeographyActionTypes, actionTypes, GeographyActions } from "./Types";
import { ThunkAction } from "redux-thunk";
import { CreateCityDto } from "../../../Interfaces";

export const geography = {
  fetchAllCountries: (): ThunkAction<Promise<GeographyActionTypes>, {}, {}, GeographyActionTypes> => {
    return (dispatch) => {
      dispatch(GeographyActions.waitOnCountriesRequest());
      return Axios.get("http://localhost:3002/v1/country").then((res) => dispatch(GeographyActions.fetchCountriesReceived(res.data)));
    };
  },

  fetchAllStates: (): ThunkAction<Promise<GeographyActionTypes>, {}, {}, GeographyActionTypes> => {
    return (dispatch) => {
      dispatch(GeographyActions.waitOnStatesRequest());
      return Axios.get("http://localhost:3002/v1/state").then((res) => dispatch(GeographyActions.fetchStatesReceived(res.data)));
    };
  },

  fetchAllCities: (): ThunkAction<Promise<GeographyActionTypes>, {}, {}, GeographyActionTypes> => {
    return (dispatch) => {
      dispatch(GeographyActions.waitOnCitiesRequest());
      return Axios.get("http://localhost:3002/v1/city").then((res) => dispatch(GeographyActions.fetchCitiesReceived(res.data)));
    };
  },

  createNewCity: (city: CreateCityDto): ThunkAction<Promise<GeographyActionTypes>, {}, {}, GeographyActionTypes> => {
    return (dispatch) => {
      dispatch(GeographyActions.waitOnCreateCity());
      return Axios.post("http://localhost:3002/v1/city", city).then((res) => dispatch(GeographyActions.createCityFinished()));
    };
  },
} as const;
