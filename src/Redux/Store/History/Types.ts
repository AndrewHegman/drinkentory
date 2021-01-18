import { ActionType } from "../../Common";
import { HistoryDocument } from "../../../Interfaces";
export const actionTypes = {
  WAIT_ON_FETCH_HISTORY: "WAIT_ON_FETCH_HISTORY",
  FETCH_HISTORY_FINISHED: "FETCH_HISTORY_FINISHED",
} as const;

export interface HistoryState {
  history: HistoryDocument[];
  isLoadingHistory: boolean;
}

export const HistoryActions = {
  waitOnFetchHistory: () =>
    ({
      type: actionTypes.WAIT_ON_FETCH_HISTORY,
    } as const),

  fetchHistoryFinished: (history: HistoryDocument[]) =>
    ({
      type: actionTypes.FETCH_HISTORY_FINISHED,
      history,
    } as const),
};

export type HistoryActionTypes = ActionType<typeof HistoryActions>;
