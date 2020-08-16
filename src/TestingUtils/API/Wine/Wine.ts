import { WineInventory } from "../../Data/Wine";

export const getWineIds = () => {
  return Object.keys(WineInventory);
};

export const getWine = (id: string) => {
  return WineInventory[parseInt(id)];
};
