import { StateDocument } from ".";

export type CityDocument = {
  _id: string;
  name: string;
  state: StateDocument;
};

export type AddCityDto = CityDocument;
