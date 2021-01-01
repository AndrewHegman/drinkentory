import Axios from "axios";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../";
import { AddStyleDto } from "../../../Interfaces";
import { StyleActions, StyleActionTypes } from "./Types";
import { AxiosError } from "axios";
import { CommonActions, CommonActionTypes } from "../Common/Types";
import { formatErrorMessage } from "../../Common";

export const styles = {
  setNewStyleName: (name: string): ThunkAction<StyleActionTypes, RootState, {}, StyleActionTypes> => {
    return (dispatch) => {
      return dispatch(StyleActions.setNewStyleName(name));
    };
  },
  fetchAllStyles: (): ThunkAction<Promise<StyleActionTypes>, RootState, {}, StyleActionTypes> => {
    return (dispatch, getState) => {
      dispatch(StyleActions.waitOnFetchAllStyles());
      const { serverAddress } = getState().common;
      return Axios.get(`${serverAddress}/v1/style`).then((res) => dispatch(StyleActions.fetchAllStylesFinished(res.data)));
    };
  },

  addNewStyleWithBaseStyle: (style: AddStyleDto): ThunkAction<Promise<StyleActionTypes>, RootState, {}, StyleActionTypes> => {
    return (dispatch, getState) => {
      dispatch(StyleActions.waitOnAddNewStyle());
      const { serverAddress } = getState().common;

      return Axios.post(`${serverAddress}/v1/style`, {
        name: style.name,
        baseStyle: style.baseStyle,
      }).then((res) => dispatch(StyleActions.addNewStyleFinished(res.data)));
    };
  },

  addNewStyle: (
    name: string
  ): ThunkAction<
    Promise<ReturnType<typeof StyleActions.addNewStyleFinished> | CommonActionTypes>,
    RootState,
    {},
    StyleActionTypes | CommonActionTypes
  > => {
    return (dispatch, getState) => {
      dispatch(StyleActions.waitOnAddNewStyle());
      const { serverAddress } = getState().common;

      return Axios.post(`${serverAddress}/v1/style`, {
        name,
      })
        .then((res) => dispatch(StyleActions.addNewStyleFinished(res.data)))
        .catch((error: AxiosError) => dispatch(CommonActions.setNetworkError(formatErrorMessage(error))));
    };
  },
};
