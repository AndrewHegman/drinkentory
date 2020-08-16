export enum ServerEndpoint {
  Development = "development",
  Production = "production",
  Localhost = "localhost",
}

export enum QuantityChangeDirection {
  Up = 0,
  Down = 1,
}

export type BeerItem = {
  name: string;
  brewery: string;
  style: string;
};

export type WineItem = {
  name: string;
  varietal: string;
  producer: string;
  country: string;
  vintage: number;
  region: string;
};
