import { BreweryDocument } from "../../../Interfaces";
import Axios from "axios";
import { BreweryActions, BreweryActionTypes, BreweryState } from "./Types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { selectors } from "../../";

export const breweries = {
  setNewBreweryName: (name: string): BreweryActionTypes => {
    return BreweryActions.setNewBreweryName(name);
  },

  setNewBreweryCountry: (countryId: string): ThunkAction<BreweryActionTypes, RootState, {}, BreweryActionTypes> => {
    return (dispatch, getState) => {
      const state = getState();
      const country = selectors.geography.countryById(state, countryId);

      if (!country) {
        throw new Error(`Unable to find document in store for country with id ${countryId}`);
      }
      return dispatch(BreweryActions.setNewBreweryCountry(country));
    };
  },

  setNewBreweryState: (stateId: string): ThunkAction<BreweryActionTypes, RootState, {}, BreweryActionTypes> => {
    return (dispatch, getState) => {
      const state = getState();
      const _state = selectors.geography.stateById(state, stateId);

      if (!_state) {
        throw new Error(`Unable to find document in store for state with id ${stateId}`);
      }
      return dispatch(BreweryActions.setNewBreweryState(_state));
    };
  },

  setNewBreweryCity: (cityId: string): ThunkAction<BreweryActionTypes, RootState, {}, BreweryActionTypes> => {
    return (dispatch, getState) => {
      const state = getState();
      const city = selectors.geography.cityById(state, cityId);

      if (!city) {
        throw new Error(`Unable to find document in store for city with id ${cityId}`);
      }
      return dispatch(BreweryActions.setNewBreweryCity(city));
    };
  },

  fetchAllBreweries: (expandFields?: [keyof BreweryDocument]): ThunkAction<Promise<BreweryActionTypes>, {}, {}, BreweryActionTypes> => {
    return (dispatch) => {
      dispatch(BreweryActions.waitOnRequest(true));
      return Axios.get(`http://localhost:3002/v1/brewery${expandFields ? `?expand=${expandFields.join(",")}` : ""}`)
        .then((res) => res.data)
        .then((json) => dispatch(BreweryActions.waitOnRequest(false, "breweries", json)));
    };
  },

  resetNewBrewery: () => {
    return BreweryActions.resetNewBrewery();
  },
};
