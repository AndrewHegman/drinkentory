import { UserActions, UsersActionTypes } from "./Types";

export const users = {
  setToken: (token: string): UsersActionTypes => {
    return UserActions.setToken(token);
  },
} as const;
