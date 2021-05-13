import { post } from "./common";

export const authorizeUser = async (address: string, email: string, password: string) => {
  const _address = `${address}/v2/auth/login`;
  const body = JSON.stringify({
    email,
    password,
  });
  return await post(_address, body);
};
