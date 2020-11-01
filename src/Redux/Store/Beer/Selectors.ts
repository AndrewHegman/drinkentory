import { RootState } from "../index";
import { Beer, BeerExpanded } from "../../../Interfaces/Beer.types";
import { Brewery } from "../../../Interfaces/Brewery.types";

export const getNewBeerId = (state: RootState): string => state.beer.newBeer?._id || "";

export const getNewBeerName = (state: RootState): string => state.beer.newBeer?.name || "";

export const getNewBeerBrewery = (state: RootState): string | Brewery => state.beer.newBeer?.brewery || "";

export const getNewBeerStyle = (state: RootState): string | Brewery => state.beer.newBeer?.style || "";

export const getNewBeerQuantity = (state: RootState): number => state.beer.newBeer?.quantity || 0;

export const getNewBeerHistoricQuantity = (state: RootState): number => state.beer.newBeer?.historicQuantity || 0;

export const getAllBeer = (state: RootState): Beer[] => state.beer.inventory;

export const getCurrentBeer = (state: RootState): Beer[] => state.beer.inventory.filter((beer) => beer.quantity > 0);

export const getBeerById = (state: RootState, id: string): Beer | undefined => state.beer.inventory.find((beer: Beer) => beer._id === id);

export const getExpandedBeerById = (state: RootState, id: string): BeerExpanded | undefined => {
  const beer = getBeerById(state, id);
  if (!beer) {
    return undefined;
  }

  const breweryId = beer?.brewery;
  return {
    ...beer!,
    brewery: state.breweries.breweries.find((brewery) => brewery._id === breweryId)!,
  };
};

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
