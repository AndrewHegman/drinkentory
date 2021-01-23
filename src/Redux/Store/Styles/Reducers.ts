import { AddStyleDto } from "../../../Interfaces";
import { StyleState, actionTypes, StyleActionTypes } from "./Types";

const initialNewStyle: AddStyleDto = {
  name: "",
  baseStyle: "",
};

export const initialState: StyleState = {
  isLoadingStyles: false,
  isWaitingOnNewStyle: false,
  styles: [],
  newStyle: initialNewStyle,
};

export const styleReducer = (state = initialState, action: StyleActionTypes): StyleState => {
  switch (action.type) {
    case actionTypes.WAIT_ON_FETCH_ALL_STYLES:
      return {
        ...state,
        isLoadingStyles: true,
      };
    case actionTypes.FETCH_ALL_STYLES_FINISHED:
      return {
        ...state,
        isLoadingStyles: false,
        styles: action.styles,
      };
    case actionTypes.WAIT_ON_ADD_NEW_STYLE:
      return {
        ...state,
        isWaitingOnNewStyle: true,
      };
    case actionTypes.ADD_NEW_STYLE_FINISHED:
      return {
        ...state,
        isWaitingOnNewStyle: false,
        styles: [...state.styles, action.style],
      };
    case actionTypes.SET_NEW_STYLE_NAME:
      return {
        ...state,
        newStyle: {
          ...state.newStyle,
          name: action.name,
        },
      };
    default:
      return state;
  }
};
