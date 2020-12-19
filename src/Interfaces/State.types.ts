import { CountryDocument } from ".";

export type StateDocument = {
  _id: string;
  name: string;
  country: CountryDocument;
};
