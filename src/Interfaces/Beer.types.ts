import { BreweryDocument, StyleDocument } from ".";

// export interface Beer {
//   _id: string;
//   name: string;
//   brewery: string;
//   style: string;
//   quantity: number;
//   historicQuantity: number;
// }

export type BeerDocument = {
  _id: string;
  name: string;
  brewery: BreweryDocument;
  style: StyleDocument;
  quantity: number;
  historicQuantity: number;
};

export type NewBeer = Omit<BeerDocument, "_id" | "historicQuantity">;
