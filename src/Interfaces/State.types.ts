import { CountryDocument } from ".";
import { ObjectId } from "mongodb";

export type StateDocument = {
  _id: string;
  name: string;
  country: CountryDocument;
  placesId: string;
};

export type AddStateDto = Omit<StateDocument, "_id">;
