import { PlaceDocument } from "./Place.types";

export type BreweryDocument = {
  _id: string;
  name: string;
  place: PlaceDocument;
};

export type NewBrewery = {
  name: string;
  place: PlaceDocument;
};
