import { StateDocument } from "./State.types";
import { CountryDocument } from "./Country.types";

export type PlaceDocument = {
  _id: string;
  name: string;
  placesId: string;
  country: CountryDocument;
  state?: StateDocument;
};

export type AddPlaceDto = Omit<PlaceDocument, "_id">;
