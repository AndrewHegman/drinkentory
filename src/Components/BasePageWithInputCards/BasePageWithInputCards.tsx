import React from "react";
import { IonContent, IonPage, IonButton, IonLoading } from "@ionic/react";
import { BasePageHeader } from "../BasePageHeader";
import { useBasePageWithInputCardsStyles } from "./BasePageWithInputCards.styles";
import { NetworkErrorAlert } from "../Alerts";

export interface IBasePageWithInputCardsProps {
  title: string;
  onClosePathname: string;
  showSubmit: boolean;
  onClose?: () => void;
  loadingSpinnerProps?: {
    show: boolean;
    message: string;
  };
  onSubmitClick?: () => void;
}

export const BasePageWithInputCards: React.FC<IBasePageWithInputCardsProps> = (props) => {
  const { onClosePathname, onSubmitClick, title, onClose, loadingSpinnerProps, showSubmit } = props;

  const classes = useBasePageWithInputCardsStyles();

  return (
    <IonPage>
      <BasePageHeader title={title} onClosePathname={onClosePathname} onClose={onClose} />
      <IonContent className={classes.root}>
        {loadingSpinnerProps && <IonLoading spinner="lines" message={loadingSpinnerProps.message} isOpen={loadingSpinnerProps.show} />}

        <NetworkErrorAlert />

        {props.children}

        {showSubmit && (
          <IonButton className={classes.submit} expand="block" onClick={onSubmitClick}>
            Submit
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};
