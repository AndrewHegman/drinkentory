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
  IonInput,
  IonLabel,
} from "@ionic/react";
import { setBreweryRoute, setStyleRoute } from "../../Utils/Routes";
import { ButtonLink } from "../../Components/ButtonLink/ButtonLink";
import { RouteComponentProps } from "react-router";
import { useBasePageWithInputCardsStyles } from "./BasePageWithInputCards.styles";
import { IonItemLink } from "../../Components/IonItemLink/IonItemLink";
import { SearchParams } from "../../Utils/Constants";
import * as queryString from "query-string";

export interface BasePageWithInputCardsProps extends RouteComponentProps {
  onClose: () => void;
}

export const BasePageWithInputCards: React.FC<BasePageWithInputCardsProps> = (props) => {
  const { onClose, location } = props;
  const searchParams = queryString.parse(location.search);
  const [name, setName] = React.useState<string>((searchParams[SearchParams.NewItemName] as string) || "");
  const classes = useBasePageWithInputCardsStyles();

  React.useEffect(() => {
    setName((searchParams[SearchParams.NewItemName] as string) || "");
  }, [searchParams]);

  const onNameChange = () => {};

  const removeBreweryNameFromSearchParams = () => {
    delete searchParams[SearchParams.BreweryName];
    return `?${queryString.stringify(searchParams)}`;
  };

  return (
    <>
      <IonPage>
        <IonToolbar>
          <IonTitle>Create new Brewery</IonTitle>
          <IonButtons slot={"end"}>
            <ButtonLink to={{ pathname: setBreweryRoute.to, search: removeBreweryNameFromSearchParams() }}>Close</ButtonLink>
          </IonButtons>
        </IonToolbar>
        <IonContent>
          <IonCard>
            <IonCardContent>
              <IonLabel position="floating" className={classes.label}>
                Brewery
              </IonLabel>
              <IonInput onIonChange={onNameChange} value={name} />
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Country</IonCardTitle>
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
              <IonItemLink to={{ pathname: setStyleRoute.to, search: location.search }}>Select</IonItemLink>
            </IonCardContent>
          </IonCard>
          <IonButton onClick={onClose}>Close</IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};
