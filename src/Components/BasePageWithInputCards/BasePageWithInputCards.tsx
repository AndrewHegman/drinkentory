import React from "react";
import { IonContent, IonPage, IonToolbar, IonTitle, IonButtons } from "@ionic/react";
import { CloseButton } from "../CloseButton/CloseButton";
import { useCreateNewItemStyles } from "./BasePageWithInputCards.styles";

export interface IBasePageWithInputCardsProps {
  title: string;
  closeRoute: {
    pathname: string;
    searchParamToDelete?: string;
  };
}

export const BasePageWithInputCards: React.FC<IBasePageWithInputCardsProps> = (props) => {
  const { closeRoute, title } = props;

  const classes = useCreateNewItemStyles();

  return (
    <IonPage>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
        <IonButtons slot={"end"}>
          <CloseButton pathname={closeRoute.pathname} />
        </IonButtons>
      </IonToolbar>
      <IonContent className={classes.root}>{props.children}</IonContent>
    </IonPage>
  );
};
