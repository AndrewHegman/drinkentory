import { HistoryActionTypes, HistoryState, actionTypes } from "./Types";

export const initialState: HistoryState = {
  history: [],
  isLoadingHistory: false,
};

export const historyReducer = (state = initialState, action: HistoryActionTypes): HistoryState => {
  switch (action.type) {
    case actionTypes.FETCH_HISTORY_FINISHED:
      return {
        ...state,
        isLoadingHistory: false,
        history: action.history,
      };
    case actionTypes.WAIT_ON_FETCH_HISTORY:
      return {
        ...state,
        isLoadingHistory: true,
      };
    default:
      return state;
  }
};
