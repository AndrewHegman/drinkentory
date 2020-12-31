import { CountryDocument } from "./Country.types";

export type StateDocument = {
  name: string;
  country: CountryDocument;
  placesId: string;
};
