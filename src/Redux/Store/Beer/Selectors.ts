import { RootState } from "../index";
import { Beer } from "./Types";

export const getBeerId = (state: RootState): string => state.beer.newBeer.id;

export const getBeerName = (state: RootState): string => state.beer.newBeer.name;

export const getBeerBrewery = (state: RootState): string => state.beer.newBeer.brewery;

export const getBeerStyle = (state: RootState): string => state.beer.newBeer.style;

export const getBeerQuantity = (state: RootState): number => state.beer.newBeer.quantity;

export const getBeerHistoricQuantity = (state: RootState): number => state.beer.newBeer.historicQuantity;

export const getAllBeer = (state: RootState): Beer[] => state.beer.inventory;

export const getCurrentBeer = (state: RootState): Beer[] => state.beer.inventory.filter((beer) => beer.quantity > 0);

export const getBeerById = (state: RootState, id: string): Beer => state.beer.inventory.find((beer: Beer) => beer.id === id);

export type BrewerySelectors =
  | typeof getBeerId
  | typeof getBeerName
  | typeof getBeerBrewery
  | typeof getBeerStyle
  | typeof getBeerQuantity
  | typeof getBeerHistoricQuantity;
