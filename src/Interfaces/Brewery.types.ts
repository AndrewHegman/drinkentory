import { CountryDocument, StateDocument, CityDocument } from ".";

export type BreweryDocument = {
  _id: string;
  name: string;
  country: CountryDocument;
  state?: StateDocument;
  city?: CityDocument;
};

export type NewBrewery = {
  name: string;
  country: string;
  state?: string;
  city?: string;
};

export type SetBreweryCountryDto = {
  _id: string;
};
