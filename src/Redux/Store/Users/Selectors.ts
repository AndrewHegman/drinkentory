import { RootState } from "../index";

export const users = {
  isLoggedIn: (state: RootState) => !!state.users.token,
};
