import React from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/react";
import { IonItemLink } from "../IonItemLink/IonItemLink";
import { Link } from "react-router-dom";
import { useLinkInputCardStyles } from "./LinkInputCard.styles";

export interface ILinkInputCard {
  title: string;
  pathname: string;
  content: string;
  search?: string;
}

export const LinkInputCard: React.FC<ILinkInputCard> = ({ title, pathname, search, content }) => {
  const classes = useLinkInputCardStyles();
  return (
    <IonCard>
      <Link to={{ pathname, search }} className={classes.link}>
        <IonCardHeader>
          <IonCardTitle className={classes.header}>{title}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent className={classes.content}>{content}</IonCardContent>
      </Link>
    </IonCard>
  );
};
