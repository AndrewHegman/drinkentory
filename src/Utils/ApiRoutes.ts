const baseUrl = "http://localhost:3002/v1";

const buildUrl = () => {};

export const beer = {
  getAllBeer: `${baseUrl}/beer?expand=brewery,style`,
  getBeerById: `http://localhost:3002/v1/beer/%id%?expand=brewery,style`,
  incrementBeerQuantity: `http://localhost:3002/v1/beer/%id%`,
};
