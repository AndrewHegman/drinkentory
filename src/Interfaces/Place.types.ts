import { AddStateDto, StateDocument } from "./State.types";
import { AddCountryDto, CountryDocument } from "./Country.types";

type PlaceDocumentBase = {
  _id: string;
  placesId: string;
  name: string;
};

interface PlaceDocumentWithState extends PlaceDocumentBase {
  country: CountryDocument;
  state: StateDocument;
}

interface PlaceDocumentWithCountry extends PlaceDocumentBase {
  country: CountryDocument;
  state?: never;
}

export type PlaceDocument = PlaceDocumentWithCountry | PlaceDocumentWithState;

export type AddPlaceDto = {
  placesId: string;
  name: string;
  country: AddCountryDto | CountryDocument;
  state?: AddStateDto | StateDocument;
};
