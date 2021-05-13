const baseUrl = "http://localhost:3002/v1";

export enum beer {
  getAllBeer = "%address%/beer?expand=brewery,style",
  getBeerById = "%address%/v1/beer/%id%?expand=brewery,style",
  incrementBeerQuantity = "%address%/v1/beer/%id%",
}

export enum UserAPI {
  login = "%address%/v2/login",
}

const buildUrl = (route: beer) => {};
