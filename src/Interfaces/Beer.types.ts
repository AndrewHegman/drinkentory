import { Brewery } from "./Brewery.types";
import { Style } from "./Style.types";

export interface Beer {
  _id: string;
  name: string;
  brewery: string;
  style: string;
  quantity: number;
  historicQuantity: number;
}

export interface BeerExpanded {
  _id: string;
  name: string;
  brewery: Brewery;
  style: string;
  quantity: number;
  historicQuantity: number;
}
