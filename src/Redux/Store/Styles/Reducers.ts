import { StyleDocument } from "../../../Interfaces";
import { StyleState, actionTypes, StyleActionTypes } from "./Types";

const initialState: StyleState = {
  isLoading: false,
  styles: [],
};

const initialNewStyle: StyleDocument = {
  _id: "",
  name: "",
};

export const styleReducer = (state = initialState, action: StyleActionTypes): StyleState => {
  switch (action.type) {
    case actionTypes.FETCH_ALL_STYLES:
      return {
        ...state,
        styles: action.styles,
      };
    case actionTypes.WAIT_ON_STYLES_REQUEST:
      if (action.fieldToUpdate) {
        return {
          ...state,
          isLoading: action.isLoading,
          [action.fieldToUpdate]: action.payload,
        };
      }
      return {
        ...state,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};
