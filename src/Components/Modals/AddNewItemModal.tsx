import React from "react";
import {
  IonButton,
  IonContent,
  IonModal,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
} from "@ionic/react";
import { withRouter, RouteComponentProps } from "react-router";
import { useAddNewItemModalStyles } from "./AddNewItemModal.styles";
import { SetBreweryModal } from "./SetBreweryModal";
import { SetStyleModal } from "./SetStyleModal";

export interface IAddNewItemModal {
  onClose: () => void;
}

const AddNewItemModalComponent: React.FC<IAddNewItemModal & RouteComponentProps> = (props) => {
  const { onClose, location } = props;

  const classes = useAddNewItemModalStyles();

  const onSetBreweryModalClose = () => {
    props.history.push({
      pathname: "/inventory/add",
      search: props.history.location.search,
    });
  };

  const onSetStyleModalClose = () => {
    props.history.push({
      pathname: "/inventory/add",
      search: props.history.location.search,
    });
  };

  return (
    <>
      <IonContent>
        <IonModal isOpen={!!location.pathname.match(/.*\/(add)/)} onDidDismiss={onClose} cssClass={classes.root}>
          <IonToolbar>
            <IonTitle>Add new Beer</IonTitle>
            <IonButtons slot={"end"}>
              <IonButton onClick={props.onClose}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Beer</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem
                button
                onClick={() => {
                  console.log(props.history.location);
                  props.history.push({
                    pathname: `${props.history.location.pathname}/setbrewery`,
                    search: location.search,
                  });
                }}
              >
                Select
              </IonItem>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Brewery</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem
                button
                onClick={() => {
                  console.log(props.history.location);
                  props.history.push({
                    pathname: `${props.history.location.pathname}/setbrewery`,
                    search: location.search,
                  });
                }}
              >
                Select
              </IonItem>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Style</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem
                button
                onClick={() => {
                  console.log(props.history.location);
                  props.history.push({
                    pathname: `${props.history.location.pathname}/setstyle`,
                    search: location.search,
                  });
                }}
              >
                Select
              </IonItem>
            </IonCardContent>
          </IonCard>
          <IonButton onClick={onClose}>Close</IonButton>
        </IonModal>
      </IonContent>
      <SetBreweryModal onClose={onSetBreweryModalClose} />
      <SetStyleModal onClose={onSetStyleModalClose} />
    </>
  );
};

export const AddNewItemModal = withRouter(AddNewItemModalComponent);
