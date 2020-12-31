import { AddStyleDto, StyleDocument } from "../../../Interfaces/Style.types";
import { ActionType } from "../../Common";

export const actionTypes = {
  WAIT_ON_ADD_NEW_STYLE: "WAIT_ON_ADD_NEW_STYLE",
  WAIT_ON_FETCH_ALL_STYLES: "WAIT_ON_FETCH_ALL_STYLES",
  FETCH_ALL_STYLES_FINISHED: "FETCH_ALL_STYLES_FINISHED",
  ADD_NEW_STYLE_FINISHED: "ADD_NEW_STYLE_FINISHED",
  SET_NEW_STYLE_NAME: "SET_NEW_STYLE_NAME",
} as const;

export interface StyleState {
  isLoadingStyles: boolean;
  isWaitingOnNewStyle: boolean;
  newStyle: AddStyleDto;
  styles: StyleDocument[];
}

export const StyleActions = {
  waitOnAddNewStyle: () =>
    ({
      type: actionTypes.WAIT_ON_ADD_NEW_STYLE,
    } as const),

  addNewStyleFinished: (style: StyleDocument) =>
    ({
      type: actionTypes.ADD_NEW_STYLE_FINISHED,
      style,
    } as const),

  waitOnFetchAllStyles: () =>
    ({
      type: actionTypes.WAIT_ON_FETCH_ALL_STYLES,
    } as const),

  fetchAllStylesFinished: (styles: StyleDocument[]) =>
    ({
      type: actionTypes.FETCH_ALL_STYLES_FINISHED,
      styles,
    } as const),

  setNewStyleName: (name: string) =>
    ({
      type: actionTypes.SET_NEW_STYLE_NAME,
      name,
    } as const),
};

export type StyleActionTypes = ActionType<typeof StyleActions>;
