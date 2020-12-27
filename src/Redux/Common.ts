import { AxiosError } from "axios";

// Credit -- https://spin.atomicobject.com/2020/09/09/type-safe-redux-typescript/
export type ValueOf<T> = T[keyof T];

export type ActionType<TActions extends { [k: string]: any }> = ReturnType<ValueOf<TActions>>;

export const formatErrorMessage = (error: AxiosError) => {
  console.log(error.response);
  if (error.response) {
    const _message =
      (typeof error.response.data.message as any) === Array ? error.response.data.message : [error.response.data.message];
    // typeof error.response.data.message === Array ?
    return `<strong>Error:</strong> ${error.response.data.error}<br />
            <strong>Status Code:</strong> ${error.response.data.statusCode}<br />
            <strong>Request:</strong> ${error.response.config.method?.toUpperCase()} ${error.response.config.url}<br />
            <strong>Data:</strong> ${JSON.stringify(error.response.config.data)}<br />
            <strong>Reason(s):</strong><ul>${_message.map((msg: string) => `<li>${msg}</li>`).join("")}</ul>`;
  }
  return JSON.stringify(error);
};
