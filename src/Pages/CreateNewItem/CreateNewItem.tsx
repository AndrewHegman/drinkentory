import React from "react";
import {
  IonButton,
  IonContent,
  IonPage,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonLabel,
} from "@ionic/react";
import { addNewItemRoute, setBreweryRoute } from "../../Utils/Routes";
import { ButtonLink } from "../../Components/ButtonLink/ButtonLink";
import { withRouter, RouteComponentProps } from "react-router";
import { useCreateNewItemStyles } from "./CreateNewItem.styles";
import { IonItemLink } from "../../Components/IonItemLink/IonItemLink";
import { SearchParams } from "../../Utils/Constants";
import * as queryString from "query-string";

export interface CreateNewItemProps {
  onClose: () => void;
}

const CreateNewItemComponent: React.FC<CreateNewItemProps & RouteComponentProps> = (props) => {
  const { onClose, location, history } = props;
  const searchParams = queryString.parse(location.search);
  const [name, setName] = React.useState<string>((searchParams[SearchParams.NewItemName] as string) || "");
  const classes = useCreateNewItemStyles();

  return (
    <IonPage>
      <IonToolbar>
        <IonTitle>Create new Beer</IonTitle>
        <IonButtons slot={"end"}>
          <ButtonLink to={{ pathname: addNewItemRoute.to, search: location.search }}>Close</ButtonLink>
        </IonButtons>
      </IonToolbar>
      <IonContent>
        <IonCard>
          <IonCardContent>
            <IonLabel position="floating" className={classes.label}>
              Beer
            </IonLabel>
            <IonInput
              onIonChange={(event) => setName(event.detail.value || "")}
              onIonBlur={() => {
                searchParams[SearchParams.NewItemName] = name;
                history.push({
                  search: `?${queryString.stringify(searchParams)}`,
                });
              }}
              value={name}
            />
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Brewery</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItemLink to={{ pathname: setBreweryRoute.to, search: location.search }}>Select</IonItemLink>
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
                history.push({
                  pathname: `${history.location.pathname}/setstyle`,
                  search: location.search,
                });
              }}
            >
              Select
            </IonItem>
          </IonCardContent>
        </IonCard>
        <IonButton onClick={onClose}>Close</IonButton>
      </IonContent>
    </IonPage>
  );
};

export const CreateNewItem = withRouter(CreateNewItemComponent);
