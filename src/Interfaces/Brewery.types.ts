import { CountryDocument, StateDocument, CityDocument } from ".";

export type BreweryDocument = {
  _id: string;
  name: string;
  country: CountryDocument;
  state?: StateDocument;
  city?: CityDocument;
};

export type NewBrewery = Omit<BreweryDocument, "_id">;
