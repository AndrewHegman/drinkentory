import { RootState } from "../index";
import { Beer } from "./Types";

export const getNewBeerId = (state: RootState): string => state.beer.newBeer?.id || "";

export const getNewBeerName = (state: RootState): string => state.beer.newBeer?.name || "";

export const getNewBeerBrewery = (state: RootState): string => state.beer.newBeer?.brewery || "";

export const getNewBeerStyle = (state: RootState): string => state.beer.newBeer?.style || "";

export const getNewBeerQuantity = (state: RootState): number => state.beer.newBeer?.quantity || 0;

export const getNewBeerHistoricQuantity = (state: RootState): number => state.beer.newBeer?.historicQuantity || 0;

export const getAllBeer = (state: RootState): Beer[] => state.beer.inventory;

export const getCurrentBeer = (state: RootState): Beer[] => state.beer.inventory.filter((beer) => beer.quantity > 0);

export const getBeerById = (state: RootState, id: string): Beer | undefined => state.beer.inventory.find((beer: Beer) => beer.id === id);

export type BrewerySelectors =
  | typeof getNewBeerId
  | typeof getNewBeerName
  | typeof getNewBeerBrewery
  | typeof getNewBeerStyle
  | typeof getNewBeerQuantity
  | typeof getNewBeerHistoricQuantity
  | typeof getAllBeer
  | typeof getCurrentBeer
  | typeof getBeerById;
