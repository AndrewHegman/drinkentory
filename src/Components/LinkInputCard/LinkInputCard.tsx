import React from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/react";
import { IonItemLink } from "../IonItemLink/IonItemLink";

export interface ILinkInputCard {
  title: string;
  pathname: string;
  search?: string;
}

export const LinkInputCard: React.FC<ILinkInputCard> = ({ title, pathname, search }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItemLink to={{ pathname, search }}>Select</IonItemLink>
      </IonCardContent>
    </IonCard>
  );
};
