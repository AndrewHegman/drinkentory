import React from "react";
import { IonContent, IonPage, IonButton } from "@ionic/react";
import { BasePageHeader } from "../BasePageHeader";
import { useBasePageWithInputCardsStyles } from "./BasePageWithInputCards.styles";
import { useHistory } from "react-router";
import { NetworkErrorAlert } from "../NetworkErrorAlert";

export interface IBasePageWithInputCardsProps {
  title: string;
  onClosePathname: string;
  showSubmit: boolean;
  onClose?: () => void;
  onSubmitClick?: () => void;
  onSubmitPathname?: string;
  onSubmitSearch?: string;
}

export const BasePageWithInputCards: React.FC<IBasePageWithInputCardsProps> = (props) => {
  const {
    onClosePathname,
    onSubmitClick,
    onSubmitPathname,
    onSubmitSearch,
    title,
    onClose,
  } = props;

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
        <NetworkErrorAlert />

        {props.children}
        <IonButton
          className={classes.submit}
          expand="block"
          onClick={onSubmitClick}
          routerDirection={"back"}
          routerLink={`${onSubmitPathname}${onSubmitSearch || history.location.search}`}
        >
          Submit
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
