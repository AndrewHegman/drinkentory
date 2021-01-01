import { PlaceDocument } from "../../../Interfaces";
import Axios from "axios";
import { BreweryActions, BreweryActionTypes } from "./Types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";

export const breweries = {
  setNewBreweryName: (name: string): BreweryActionTypes => {
    return BreweryActions.setNewBreweryName(name);
  },

  setNewBreweryPlace: (place: PlaceDocument): ThunkAction<BreweryActionTypes, RootState, {}, BreweryActionTypes> => {
    return (dispatch) => {
      return dispatch(BreweryActions.setNewBreweryPlace(place));
    };
  },

  fetchAllBreweries: (): ThunkAction<Promise<BreweryActionTypes>, RootState, {}, BreweryActionTypes> => {
    return (dispatch, getState) => {
      dispatch(BreweryActions.waitOnFetchAllBreweries());
      const { serverAddress } = getState().common;
      return Axios.get(`${serverAddress}/v1/brewery`).then((res) => dispatch(BreweryActions.fetchAllBreweriesFinished(res.data)));
    };
  },

  resetNewBrewery: () => {
    return BreweryActions.resetNewBrewery();
  },

  waitOnUpdatingNewBreweryLocation: (): BreweryActionTypes => {
    return BreweryActions.waitOnUpdatingNewBreweryLocation();
  },

  updatingNewBreweryLocationFinished: (): BreweryActionTypes => {
    return BreweryActions.updatingNewBreweryLocationFinished();
  },

  createNewBrewery: (): ThunkAction<Promise<ReturnType<typeof BreweryActions.createNewBreweryFinished>>, RootState, {}, BreweryActionTypes> => {
    return (dispatch, getState) => {
      const { breweries, common } = getState();
      const { newBrewery } = breweries;
      if (!newBrewery) {
        throw new Error("newBrewery is not defined in the store. Not creating a new brewery");
      }

      dispatch(BreweryActions.waitOnCreateNewBrewery());
      const { serverAddress } = common;

      return Axios.post(`${serverAddress}/v1/brewery`, {
        name: newBrewery.name,
        place: newBrewery.place._id,
      }).then((res) => {
        return dispatch(BreweryActions.createNewBreweryFinished(res.data));
      });
    };
  },
};
