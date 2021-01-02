import { ServerAddress } from "../../../Utils";
import { CommonState, CommonActionTypes, actionTypes } from "./Types";

// Pulled from serviceWorker.ts created by CRA
const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

const initialState: CommonState = {
  isNetworkError: false,
  networkErrorMessage: "",
  serverAddress: isLocalhost ? ServerAddress.Localhost : ServerAddress.Production,
};

export const commonReducer = (state = initialState, action: CommonActionTypes): CommonState => {
  switch (action.type) {
    case actionTypes.SET_NETWORK_ERROR:
      return {
        ...state,
        isNetworkError: true,
        networkErrorMessage: action.message,
      };
    case actionTypes.CLEAR_NETWORK_ERROR:
      return {
        ...state,
        isNetworkError: false,
        networkErrorMessage: "",
      };
    case actionTypes.SET_SERVER_ADDRESS:
      return {
        ...state,
        serverAddress: action.serverAddress,
      };
    default:
      return state;
  }
};
