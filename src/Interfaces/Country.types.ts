import { ObjectId } from "mongodb";

export type CountryDocument = {
  _id: string;
  name: string;
  placesId: string;
};

export type AddCountryDto = Omit<CountryDocument, "_id">;
