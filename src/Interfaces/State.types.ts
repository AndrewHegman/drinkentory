import { CountryDocument } from ".";

export type StateDocument = {
  name: string;
  country: CountryDocument;
};
