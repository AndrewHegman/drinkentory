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
  const getLocationString = () => {
    if (brewery.city) {
      return `${brewery.city.name}, ${brewery.state?.name}`;
    } else if (brewery.state) {
      return `${brewery.state.name}, ${brewery.country.name}`;
    } else {
      return `${brewery.country.name}`;
    }
  };
  return (
    <IonLabel>
      <h1>{brewery.name}</h1>
      <h3>{getLocationString()} </h3>
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

export interface IListItemLocation {
  terms: { offset: number; value: string }[];
}

export const ListItemLocation: React.FC<IListItemLocation> = (props) => {
  const { terms } = props;
  console.log(props);
  return (
    <IonLabel>
      <h1>{`${terms[0].value}${terms.length > 2 ? `, ${terms[1].value}` : ""}`}</h1>
      <h3>{terms[terms.length - 1].value}</h3>
    </IonLabel>
  );
};
