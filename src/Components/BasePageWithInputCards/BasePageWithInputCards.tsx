import React from "react";
import { IonContent, IonPage, IonButton, IonLoading } from "@ionic/react";
import { BasePageHeader } from "../BasePageHeader";
import { useBasePageWithInputCardsStyles } from "./BasePageWithInputCards.styles";
import { useHistory } from "react-router";
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
  const { onClosePathname, onSubmitClick, title, onClose, loadingSpinnerProps } = props;

  const classes = useBasePageWithInputCardsStyles();
  const history = useHistory();

  React.useEffect(() => {
    if (props.showSubmit && !props.onSubmitClick) {
      console.warn('If "showSubmit" prop is "true", the "onSubmitClick" callback must defined');
    }
  }, [props.showSubmit, props.onSubmitClick]);

  return (
    <IonPage>
      <BasePageHeader title={title} onClosePathname={onClosePathname} onClose={onClose} />
      <IonContent className={classes.root}>
        {loadingSpinnerProps && <IonLoading spinner="lines" message={loadingSpinnerProps.message} isOpen={loadingSpinnerProps.show} />}

        <NetworkErrorAlert />

        {props.children}
        <IonButton className={classes.submit} expand="block" onClick={onSubmitClick}>
          Submit
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
