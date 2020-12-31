import React from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/react";
import { Link } from "react-router-dom";
import { useLinkInputCardStyles } from "./LinkInputCard.styles";
import { useCommonIonCardStyles } from "./CommonIonCard.styles";

export interface ILinkInputCard {
  title: string;
  pathname: string;
  content: string;
  search?: string;
}

export const LinkInputCard: React.FC<ILinkInputCard> = ({ title, pathname, search, content }) => {
  const classes = useLinkInputCardStyles();
  const commonClasses = useCommonIonCardStyles();

  return (
    <IonCard>
      <Link to={{ pathname, search }} className={classes.link}>
        <IonCardHeader>
          <IonCardTitle className={commonClasses.header}>{title}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent className={classes.content}>{content}</IonCardContent>
      </Link>
    </IonCard>
  );
};
