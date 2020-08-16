import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { IonButton, IonContent, IonModal, IonToolbar, IonTitle, IonButtons, IonSearchbar, IonHeader } from "@ionic/react";
import { useSetBreweryModalStyles } from "./SetBreweryModal.styles";

export interface ISetBreweryModalProps {
  onClose: () => void;
}

const SetBreweryModalComponent: React.FC<ISetBreweryModalProps & RouteComponentProps> = (props) => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [breweries, setBreweries] = React.useState<string[]>([]);

  const { location, onClose } = props;
  const classes = useSetBreweryModalStyles();

  return (
    <IonContent>
      <IonModal isOpen={!!location.pathname.match(/.*\/(setbrewery)/)} onDidDismiss={onClose} cssClass={classes.root}>
        <IonHeader translucent>
          <IonToolbar>
            <IonTitle slot={"start"}>Choose a Brewery</IonTitle>
            <IonButtons slot={"end"}>
              <IonButton onClick={props.onClose}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar />
          </IonToolbar>
        </IonHeader>
      </IonModal>
    </IonContent>
  );
};

export const SetBreweryModal = withRouter(SetBreweryModalComponent);
