import React from "react";
import { IonLabel } from "@ionic/react";
import { BeerExpanded, Brewery, Domains, Wine } from "../../Interfaces";

interface IListItemBeerProps {
  beer: BeerExpanded;
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
  wine: Wine;
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
  brewery: Brewery;
}

export const ListItemBrewery: React.FC<IListItemBreweryProps> = (props) => {
  const { brewery } = props;
  return (
    <IonLabel>
      <h1>{brewery.name}</h1>
      <h3>{`${brewery.city ? `${brewery.city}, ` : ""}${brewery.country}`} </h3>
    </IonLabel>
  );
};
