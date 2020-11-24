import Axios from "axios";
import { Style } from "../../../Interfaces/Style.types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { SET_NEW_STYLE_NAME, WAIT_ON_STYLES_REQUEST, StyleActionTypes, StyleState } from "./Types";

const setWaitOnRequestStatus = (isLoading: boolean, fieldToUpdate?: keyof StyleState | keyof Style, payload?: any): StyleActionTypes => {
  return {
    type: WAIT_ON_STYLES_REQUEST,
    isLoading,
    fieldToUpdate,
    payload,
  };
};

export const fetchAllStyles = (): ThunkAction<Promise<StyleActionTypes>, {}, {}, StyleActionTypes> => {
  return (dispatch) => {
    dispatch(setWaitOnRequestStatus(true));
    return Axios.get(`http://localhost:3002/v1/style`)
      .then((res) => res.data)
      .then((json) => dispatch(setWaitOnRequestStatus(false, "styles", json)));
  };
};
