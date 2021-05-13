import Axios, { AxiosError } from "axios";
import { BeerActions, BeerActionTypes } from "./Types";
import { selectors } from "../../";
import { Container } from "../../../Interfaces";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { CommonActions, CommonActionTypes } from "../Common/Types";
import { formatErrorMessage } from "../../Common";
import { Beer as BeerAPI } from "../../../API/beer";

type CommonBeerAction = BeerActionTypes | CommonActionTypes;

export const beer = {
  setNewBeerName: (name: string): BeerActionTypes => {
    return BeerActions.setNewBeerName(name);
  },

  setNewBeerBrewery: (breweryId: string): ThunkAction<BeerActionTypes, RootState, {}, BeerActionTypes> => {
    return (dispatch, getState) => {
      const state = getState();
      const brewery = selectors.breweries.byId(state, breweryId);

      if (!brewery) {
        throw new Error(`Unable to find document in store for brewery with id ${breweryId}`);
      }

      return dispatch(BeerActions.setNewBeerBrewery(brewery));
    };
  },

  setNewBeerStyle: (styleId: string): ThunkAction<BeerActionTypes, RootState, {}, BeerActionTypes> => {
    return (dispatch, getState) => {
      const state = getState();
      const style = selectors.styles.byId(state, styleId);

      if (!style) {
        throw new Error(`Unable to find document in store for style with id ${styleId}`);
      }

      return dispatch(BeerActions.setNewBeerStyle(style));
    };
  },

  setNewBeerContainer: (container: Container): BeerActionTypes => {
    return BeerActions.setNewBeerContainer(container);
  },

  setNewBeerQuantity: (quantity: number): BeerActionTypes => {
    return BeerActions.setNewBeerQuantity(quantity);
  },

  addNewBeer: (): ThunkAction<
    Promise<ReturnType<typeof BeerActions.addNewBeerFinished> | CommonActionTypes>,
    RootState,
    {},
    BeerActionTypes | CommonActionTypes
  > => {
    return (dispatch, getState) => {
      dispatch(BeerActions.waitOnAddNewBeer());
      const { newBeer } = getState().beer;

      return BeerAPI.addNewBeer(newBeer)
        .then((res) => dispatch(BeerActions.addNewBeerFinished(res.data)))
        .catch((error: AxiosError) => dispatch(CommonActions.setNetworkError(formatErrorMessage(error))));
    };
  },

  fetchAllBeer: (): ThunkAction<
    Promise<ReturnType<typeof BeerActions.fetchAllBeerReceived> | CommonActionTypes>,
    RootState,
    {},
    CommonBeerAction
  > => {
    return (dispatch) => {
      dispatch(BeerActions.waitOnFetch());
      return BeerAPI.fetchAllBeer()
        .then((result) => dispatch(BeerActions.fetchAllBeerReceived(result as any)))
        .catch((error) => dispatch(CommonActions.setNetworkError(formatErrorMessage(error))));
    };
  },

  fetchBeerById: (id: string): ThunkAction<Promise<BeerActionTypes | CommonActionTypes>, RootState, {}, BeerActionTypes | CommonActionTypes> => {
    return (dispatch) => {
      dispatch(BeerActions.waitOnFetch());
      return BeerAPI.fetchBeerById(id)
        .then((res) => dispatch(BeerActions.fetchByIdReceived(res.data)))
        .catch((error) => dispatch(CommonActions.setNetworkError(formatErrorMessage(error))));
    };
  },

  incrementBeerQuantity: (
    id: string
  ): ThunkAction<Promise<BeerActionTypes | CommonActionTypes>, RootState, {}, BeerActionTypes | CommonActionTypes> => {
    return (dispatch) => {
      dispatch(BeerActions.waitOnUpdateBeer());

      return BeerAPI.incrementBeerQuantity(id)
        .then((res) => {
          console.log(res);
          return dispatch(BeerActions.updateBeerFinished(id, res));
        })
        .catch((error: AxiosError) => dispatch(CommonActions.setNetworkError(formatErrorMessage(error))));
    };
  },

  decrementBeerQuantity: (
    id: string
  ): ThunkAction<Promise<BeerActionTypes | CommonActionTypes>, RootState, {}, BeerActionTypes | CommonActionTypes> => {
    return (dispatch) => {
      dispatch(BeerActions.waitOnUpdateBeer());

      return BeerAPI.decrementBeerQuantity(id)
        .then((res) => dispatch(BeerActions.updateBeerFinished(id, res.data)))
        .catch((error: AxiosError) => dispatch(CommonActions.setNetworkError(formatErrorMessage(error))));
    };
  },

  updateBeerQuantity: (
    id: string,
    quantity: number
  ): ThunkAction<Promise<BeerActionTypes | CommonActionTypes>, RootState, {}, BeerActionTypes | CommonActionTypes> => {
    return (dispatch) => {
      dispatch(BeerActions.waitOnUpdateBeer());

      return BeerAPI.updateBeerQuantity(id, quantity)
        .then((res) => dispatch(BeerActions.updateBeerFinished(id, res.data)))
        .catch((error: AxiosError) => dispatch(CommonActions.setNetworkError(formatErrorMessage(error))));
    };
  },
} as const;
