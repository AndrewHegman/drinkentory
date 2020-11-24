import { Style } from "../../../Interfaces/Style.types";
import { StyleState, FETCH_ALL_STYLES, WAIT_ON_STYLES_REQUEST, StyleActionTypes } from "./Types";

const initialState: StyleState = {
  isLoading: false,
  styles: [],
};

const initialNewStyle: Style = {
  _id: "",
  name: "",
};

export const styleReducer = (state = initialState, action: StyleActionTypes): StyleState => {
  switch (action.type) {
    case FETCH_ALL_STYLES:
      return {
        ...state,
        styles: action.styles,
      };
    case WAIT_ON_STYLES_REQUEST:
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
