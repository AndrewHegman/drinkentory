import { StyleDocument } from "../../../Interfaces/Style.types";

export const actionTypes = {
  SET_NEW_STYLE_NAME: "SET_NEW_STYLE_NAME",
  FETCH_ALL_STYLES: "FETCH_ALL_STYLES",
  WAIT_ON_STYLES_REQUEST: "WAIT_ON_STYLES_REQUEST",
} as const;
export interface StyleState {
  isLoading: boolean;
  newStyle?: StyleDocument;
  styles: StyleDocument[];
}

export const StyleActions = {
  setNewStyleNameAction: (name: string) =>
    ({
      type: actionTypes.SET_NEW_STYLE_NAME,
      name,
    } as const),

  fetchAllStyles: (styles: StyleDocument[]) =>
    ({
      type: actionTypes.FETCH_ALL_STYLES,
      styles,
    } as const),

  waitOnRequest: (isLoading: boolean, fieldToUpdate?: keyof StyleState | keyof StyleDocument, payload?: any) =>
    ({
      type: actionTypes.WAIT_ON_STYLES_REQUEST,
      isLoading,
      fieldToUpdate,
      payload,
    } as const),
};

export type StyleActionTypes =
  | ReturnType<typeof StyleActions.setNewStyleNameAction>
  | ReturnType<typeof StyleActions.fetchAllStyles>
  | ReturnType<typeof StyleActions.waitOnRequest>;
