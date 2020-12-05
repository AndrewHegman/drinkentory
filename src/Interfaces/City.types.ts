import { StateDocument } from ".";

export type CityDocument = {
  name: string;
  state: StateDocument;
};

export type CreateCityDto = {
  name: string;
  state: string;
};
