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

  fetchAllBreweries: (): ThunkAction<Promise<BreweryActionTypes>, {}, {}, BreweryActionTypes> => {
    return (dispatch) => {
      dispatch(BreweryActions.waitOnFetchAllBreweries());
      return Axios.get("http://localhost:3002/v1/brewery").then((res) => dispatch(BreweryActions.fetchAllBreweriesFinished(res.data)));
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
      const { newBrewery } = getState().breweries;

      if (!newBrewery) {
        throw new Error("newBrewery is not defined in the store. Not creating a new brewery");
      }

      dispatch(BreweryActions.waitOnCreateNewBrewery());
      return Axios.post(`http://localhost:3002/v1/brewery`, {
        name: newBrewery.name,
        place: newBrewery.place._id,
      }).then((res) => {
        return dispatch(BreweryActions.createNewBreweryFinished(res.data));
      });
    };
  },
};
