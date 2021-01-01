import { ServerAddress } from "../../../Utils";
import { ActionType } from "../../Common";

export const actionTypes = {
  SET_NETWORK_ERROR: "SET_NETWORK_ERROR",
  CLEAR_NETWORK_ERROR: "CLEAR_NETWORK_ERROR",
  SET_SERVER_ADDRESS: "SET_SERVER_ADDRESS",
} as const;

export interface CommonState {
  isNetworkError: boolean;
  networkErrorMessage: string;
  serverAddress: string;
}

export const CommonActions = {
  setNetworkError: (message: string) =>
    ({
      type: actionTypes.SET_NETWORK_ERROR,
      message,
    } as const),
  clearNetworkError: () =>
    ({
      type: actionTypes.CLEAR_NETWORK_ERROR,
    } as const),
  setServerAddress: (serverAddress: ServerAddress) =>
    ({
      type: actionTypes.SET_SERVER_ADDRESS,
      serverAddress,
    } as const),
};

export type CommonActionTypes = ActionType<typeof CommonActions>;
