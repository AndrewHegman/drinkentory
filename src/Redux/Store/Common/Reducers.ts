import { CommonState, CommonActionTypes, actionTypes } from "./Types";

const initialState: CommonState = {
  isNetworkError: false,
  networkErrorMessage: "",
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
    default:
      return state;
  }
};
