export const getSearchParam = (search: string, param: string) => {
  return search
    .slice(search.indexOf("?") + 1)
    .split("&")
    .map((key) => key.split("="))
    .filter((pair) => pair[0] === param)[0][1];
};

export const stripParamFromSearch = (search: string, param: string) => {
  return (
    "&" +
    search
      .slice(search.indexOf("?") + 1)
      .split("&")
      .map((key) => key.split("="))
      .filter((pair) => pair[0] !== param)
      .map((pair) => pair.join("="))
      .join("&")
  );
};
