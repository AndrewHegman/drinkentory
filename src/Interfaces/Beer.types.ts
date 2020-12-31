import { BreweryDocument, StyleDocument } from ".";

export enum Container {
  Can = 1,
  Bottle = 2,
  Crowler = 3,
  Growler = 4,
}

// TODO (3): Tighten types
export const containerKeys = ["Can", "Bottle", "Crowler", "Growler"];

export type BeerDocument = {
  _id: string;
  name: string;
  brewery: BreweryDocument;
  style: StyleDocument;
  container: Container;
  quantity: number;
  historicQuantity: number;
};

export type NewBeer = Omit<BeerDocument, "_id" | "historicQuantity">;
