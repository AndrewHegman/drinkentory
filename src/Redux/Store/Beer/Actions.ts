import Axios, { AxiosError } from "axios";
import { BeerActions, BeerActionTypes } from "./Types";
import { selectors } from "../../";
import { BeerDocument, Container } from "../../../Interfaces";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { CommonActions, CommonActionTypes } from "../Common/Types";
import { formatErrorMessage } from "../../Common";

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
      const { beer, common } = getState();
      const { newBeer } = beer;

      return Axios.post(`${common.serverAddress}/v1/beer`, {
        name: newBeer.name,
        brewery: newBeer.brewery._id,
        style: newBeer.style._id,
        container: newBeer.container,
        quantity: newBeer.quantity,
        historicQuantity: newBeer.quantity,
      })
        .then((res) => dispatch(BeerActions.addNewBeerFinished(res.data)))
        .catch((error: AxiosError) => dispatch(CommonActions.setNetworkError(formatErrorMessage(error))));
    };
  },

  fetchAllBeer: (): ThunkAction<Promise<BeerActionTypes>, RootState, {}, BeerActionTypes> => {
    return (dispatch, getState) => {
      const { serverAddress } = getState().common;

      dispatch(BeerActions.waitOnFetch());
      return Axios.get(`${serverAddress}/v1/beer`).then((res) => dispatch(BeerActions.fetchAllBeerReceived(res.data)));
    };
  },

  fetchBeerById: (id: string): ThunkAction<Promise<BeerActionTypes>, RootState, {}, BeerActionTypes> => {
    return (dispatch, getState) => {
      dispatch(BeerActions.waitOnFetch());
      const { serverAddress } = getState().common;
      return Axios.get(`${serverAddress}/v1/beer/${id}?expand=brewery,style`).then((res) => dispatch(BeerActions.fetchByIdReceived(res.data)));
    };
  },

  incrementBeerQuantity: (
    id: string,
    changeAmt?: number
  ): ThunkAction<Promise<BeerActionTypes | CommonActionTypes>, RootState, {}, BeerActionTypes | CommonActionTypes> => {
    return (dispatch, getState) => {
      dispatch(BeerActions.waitOnUpdateBeer());

      const beer = selectors.beer.getBeerById(getState(), id);

      if (beer === undefined) {
        throw new Error(`Unable to find quantity of beer with ID of <b>${id}</b> in Redux store`);
      }

      const { quantity, historicQuantity } = beer;
      const { serverAddress } = getState().common;

      return Axios.put(`${serverAddress}/v1/beer/${id}`, {
        quantity: quantity + (changeAmt ? changeAmt : 1),
        historicQuantity: historicQuantity + (changeAmt ? changeAmt : 1),
      })
        .then((res) => dispatch(BeerActions.updateBeerFinished(id, res.data)))
        .catch((error: AxiosError) => {
          return dispatch(CommonActions.setNetworkError(formatErrorMessage(error)));
        });
    };
  },

  decrementBeerQuantity: (
    id: string,
    changeAmt?: number
  ): ThunkAction<Promise<BeerActionTypes | CommonActionTypes>, RootState, {}, BeerActionTypes | CommonActionTypes> => {
    return (dispatch, getState) => {
      dispatch(BeerActions.waitOnUpdateBeer());

      const quantity = selectors.beer.getBeerById(getState(), id)?.quantity;

      if (quantity === undefined) {
        throw new Error(`Unable to find quantity of beer with ID of <b>${id}</b> in Redux store`);
      }
      const { serverAddress } = getState().common;

      return Axios.put(`${serverAddress}/v1/beer/${id}`, { quantity: quantity - (changeAmt ? changeAmt : 1) })
        .then((res) => dispatch(BeerActions.updateBeerFinished(id, res.data)))
        .catch((error: AxiosError) => {
          return dispatch(CommonActions.setNetworkError(formatErrorMessage(error)));
        });
    };
  },

  updateBeerQuantity: (
    id: string,
    quantity: number
  ): ThunkAction<Promise<BeerActionTypes | CommonActionTypes>, RootState, {}, BeerActionTypes | CommonActionTypes> => {
    return (dispatch, getState) => {
      dispatch(BeerActions.waitOnUpdateBeer());
      const { serverAddress } = getState().common;

      return Axios.put(`${serverAddress}/v1/beer/${id}`, { quantity })
        .then((res) => dispatch(BeerActions.updateBeerFinished(id, res.data)))
        .catch((error: AxiosError) => {
          return dispatch(CommonActions.setNetworkError(formatErrorMessage(error)));
        });
    };
  },

  setBeerBeingEditted: (beer: BeerDocument): BeerActionTypes => {
    return BeerActions.setBeerBeingEditted(beer);
  },

  // clearBeerBeingEditted: (): BeerActionTypes => {
  //   return BeerActions.clearBeerBeingEditted();
  // },
} as const;
