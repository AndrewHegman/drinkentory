import React from "react";
import { IonLabel } from "@ionic/react";
import { BeerDocument, BreweryDocument, Domains, WineDocument } from "../../Interfaces";

interface IListItemBeerProps {
  beer: BeerDocument;
}

export const ListItemBeer: React.FC<IListItemBeerProps> = (props) => {
  const { beer } = props;

  return (
    <IonLabel>
      <h1>{beer.name}</h1>
      <h3>{beer.brewery.name}</h3>
      <p>{beer.style.name}</p>
    </IonLabel>
  );
};

export interface IListItemWineProps {
  wine: WineDocument;
}

export const ListItmeWine: React.FC<IListItemWineProps> = (props) => {
  const { wine } = props;
  return (
    <IonLabel>
      <p>{wine.producer}</p>
      <h1>{wine.name}</h1>
      <h3>{`${wine.varietal} ${wine.vintage}`}</h3>
      <p>{`${wine.region}, ${wine.country}`}</p>
    </IonLabel>
  );
};

export interface IListItemBreweryProps {
  brewery: BreweryDocument;
}

export const ListItemBrewery: React.FC<IListItemBreweryProps> = (props) => {
  const { brewery } = props;
  return (
    <IonLabel>
      <h1>{brewery.name}</h1>
      <h3>{`${brewery.city ? `${brewery.city.name}, ` : ""}${brewery.country?.name}`} </h3>
    </IonLabel>
  );
};

export interface IListItemCountryProps {
  country: string;
}

export const ListItemCountry: React.FC<IListItemCountryProps> = (props) => {
  const { country } = props;
  return (
    <IonLabel>
      <h1>{country}</h1>
    </IonLabel>
  );
};
