import Axios from "axios";
import { ThunkAction } from "redux-thunk";
import { StyleActions, StyleActionTypes } from "./Types";

export const styles = {
  fetchAllStyles: (): ThunkAction<Promise<StyleActionTypes>, {}, {}, StyleActionTypes> => {
    return (dispatch) => {
      dispatch(StyleActions.waitOnRequest(true));
      return Axios.get(`http://localhost:3002/v1/style`)
        .then((res) => res.data)
        .then((json) => dispatch(StyleActions.waitOnRequest(false, "styles", json)));
    };
  },
};
