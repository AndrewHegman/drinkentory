import { HistoryActions, HistoryActionTypes } from "./Types";
import { RootState } from "../index";
import { ThunkAction } from "redux-thunk";
import Axios, { AxiosError } from "axios";
import { CommonActions, CommonActionTypes } from "../Common/Types";
import { formatErrorMessage } from "../../Common";

export const history = {
  fetchHistory: (): ThunkAction<Promise<HistoryActionTypes | CommonActionTypes>, RootState, {}, HistoryActionTypes | CommonActionTypes> => {
    return (dispatch, getState) => {
      const { serverAddress } = getState().common;

      dispatch(HistoryActions.waitOnFetchHistory());
      return Axios.get(`${serverAddress}/v1/history`)
        .then((res) => dispatch(HistoryActions.fetchHistoryFinished(res.data)))
        .catch((error: AxiosError) => {
          return dispatch(CommonActions.setNetworkError(formatErrorMessage(error)));
        });
    };
  },
} as const;
