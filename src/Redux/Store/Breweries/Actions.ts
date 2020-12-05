import Axios from "axios";
import { BreweryDocument, CountryDocument, StateDocument, CityDocument } from "../../../Interfaces";
import { BreweryActions, BreweryActionTypes, BreweryState } from "./Types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export const breweries = {
  setNewBreweryName: (name: string): BreweryActionTypes => {
    return BreweryActions.setNewBreweryName(name);
  },

  setNewBreweryCountry: (countryId: string): BreweryActionTypes => {
    return BreweryActions.setNewBreweryCountry(countryId);
  },

  setNewBreweryState: (stateId: string): BreweryActionTypes => {
    return BreweryActions.setNewBreweryState(stateId);
  },

  setNewBreweryCity: (cityId: string): BreweryActionTypes => {
    return BreweryActions.setNewBreweryCity(cityId);
  },

  fetchAllBreweries: (expandFields?: [keyof BreweryDocument]): ThunkAction<Promise<BreweryActionTypes>, {}, {}, BreweryActionTypes> => {
    return (dispatch) => {
      dispatch(BreweryActions.waitOnRequest(true));
      return Axios.get(`http://localhost:3002/v1/brewery${expandFields ? `?expand=${expandFields.join(",")}` : ""}`)
        .then((res) => res.data)
        .then((json) => dispatch(BreweryActions.waitOnRequest(false, "breweries", json)));
    };
  },
};
