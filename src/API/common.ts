const defaultHeaders = new Headers({
  "content-type": "application/json",
  "Access-Control-Allow-Origin": "*",
});

export const post = (address: string, body: string, token?: string) => {
  const headers = defaultHeaders;

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return fetch(address, {
    method: "POST",
    mode: "cors",
    body,
    headers,
  });
};

export const get = (address: string, token: string) => {
  const newHeaders = new Headers();
  newHeaders.append("Authroization", `Bearer ${token}`);

  return fetch(address, {
    method: "GET",
    // mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const put = (address: string, body: string, token: string) => {
  const headers = defaultHeaders;

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return fetch(address, {
    method: "PUT",
    mode: "cors",
    body,
    headers,
  });
};
