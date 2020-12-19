import { RootState } from "../index";
import { BeerDocument, BreweryDocument, StyleDocument } from "../../../Interfaces";

export const beer = {
  getNewBeerName: (state: RootState): string => state.beer.newBeer?.name || "",

  getNewBeerBrewery: (state: RootState): string | BreweryDocument => state.beer.newBeer?.brewery || "",

  getNewBeerStyle: (state: RootState): string | StyleDocument => state.beer.newBeer?.style || "",

  getNewBeerQuantity: (state: RootState): number => state.beer.newBeer?.quantity || 0,

  getAllBeer: (state: RootState): BeerDocument[] => state.beer.inventory,

  getCurrentBeer: (state: RootState): BeerDocument[] => state.beer.inventory.filter((beer) => beer.quantity > 0),

  getBeerById: (state: RootState, id: string): BeerDocument | undefined => state.beer.inventory.find((beer: BeerDocument) => beer._id === id),

  getExpandedBeerById: (state: RootState, id: string): BeerDocument | undefined => {
    const beer = state.beer.inventory.find((beer: BeerDocument) => beer._id === id);
    if (!beer) {
      return undefined;
    }

    const breweryId = beer.brewery._id;
    const styleId = beer.style._id;

    return {
      ...beer,
      brewery: state.breweries.breweries.find((brewery) => brewery._id === breweryId)!,
      style: state.style.styles.find((style) => style._id === styleId)!,
    };
  },
};
