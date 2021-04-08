export enum ServerEndpoint {
  Development = "development",
  Production = "production",
  Localhost = "localhost",
}

export enum QuantityChangeDirection {
  Up = 0,
  Down = 1,
}

export type Never<T> = { [K in keyof T]?: never };

export enum config {
  SERVER_ENDPOINT_KEY = "serverEndpoint",
}

export enum SearchParams {
  Domain = "domain",
  DataType = "datatype",
  Type = "type",
  CurrentStyle = "currentstyle",
}

export enum ServerAddress {
  Localhost = "http://localhost:3002",
  Production = "https://drinkentory-server.herokuapp.com",
}

export type Datum = {
  name: string;
  value: number;
};
