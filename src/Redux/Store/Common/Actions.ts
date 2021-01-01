import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { CommonActions, CommonActionTypes } from "./Types";
import { ServerAddress } from "../../../Utils";

export const common = {
  setNetworkError: (message: string): ThunkAction<CommonActionTypes, RootState, {}, CommonActionTypes> => {
    return (dispatch) => {
      return dispatch(CommonActions.setNetworkError(message));
    };
  },
  clearNetworkError: (): ThunkAction<CommonActionTypes, RootState, {}, CommonActionTypes> => {
    return (dispatch) => {
      return dispatch(CommonActions.clearNetworkError());
    };
  },
  setServerAddress: (serverAddress: ServerAddress): CommonActionTypes => {
    return CommonActions.setServerAddress(serverAddress);
  },
};
