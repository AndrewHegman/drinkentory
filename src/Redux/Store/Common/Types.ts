import { ActionType } from "../../Common";

export const actionTypes = {
  SET_NETWORK_ERROR: "SET_NETWORK_ERROR",
  CLEAR_NETWORK_ERROR: "CLEAR_NETWORK_ERROR",
} as const;

export interface CommonState {
  isNetworkError: boolean;
  networkErrorMessage: string;
}

export const CommonActions = {
  setNetworkError: (message: string) => ({
    type: actionTypes.SET_NETWORK_ERROR,
    message,
  }),
  clearNetworkError: () => ({
    type: actionTypes.CLEAR_NETWORK_ERROR,
  }),
};

export type CommonActionTypes = ActionType<typeof CommonActions>;
