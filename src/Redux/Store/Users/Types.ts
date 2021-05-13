import { ActionType } from "../../Common";

export const actionTypes = {
  SET_TOKEN: "SET_TOKEN",
} as const;

export interface UserState {
  token: string;
}

export const UserActions = {
  setToken: (token: string) =>
    ({
      type: actionTypes.SET_TOKEN,
      token,
    } as const),
};

export type UsersActionTypes = ActionType<typeof UserActions>;
