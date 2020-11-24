import { Style } from "../../../Interfaces/Style.types";

export const SET_NEW_STYLE_NAME = "SET_NEW_STYLE_NAME";
export const FETCH_ALL_STYLES = "FETCH_ALL_STYLES";

export const WAIT_ON_STYLES_REQUEST = "WAIT_ON_STYLES_REQUEST";

export interface StyleState {
  isLoading: boolean;
  newStyle?: Style;
  styles: Style[];
}

interface SetNewStyleNameAction {
  type: typeof SET_NEW_STYLE_NAME;
  name: string;
}

interface FetchAllStyles {
  type: typeof FETCH_ALL_STYLES;
  styles: Style[];
}

interface WaitOnRequest {
  type: typeof WAIT_ON_STYLES_REQUEST;
  isLoading: boolean;
  fieldToUpdate?: keyof StyleState | keyof Style;
  payload?: any;
}

export type StyleActionTypes = SetNewStyleNameAction | FetchAllStyles | WaitOnRequest;
