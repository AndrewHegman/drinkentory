import { UserState, actionTypes, UsersActionTypes } from "./Types";

export const initialState: UserState = {
  token: "",
};

export const userReducer = (state = initialState, action: UsersActionTypes): UserState => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};
