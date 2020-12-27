import { CountryDocument, StateDocument, CityDocument } from ".";
import { PlaceDocument } from "./Place.types";

export type BreweryDocument = {
  _id: string;
  name: string;
  country: CountryDocument;
  state?: StateDocument;
  city?: CityDocument;
};

export type NewBrewery = {
  name: string;
  place: PlaceDocument;
};
