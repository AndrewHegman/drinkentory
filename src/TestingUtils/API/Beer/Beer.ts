import { BeerInventory } from "../../Data/Beer";

export const getBeerIds = () => {
  return Object.keys(BeerInventory);
};

export const getBeer = (id: string) => {
  return BeerInventory[parseInt(id)];
};
