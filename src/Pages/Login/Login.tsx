import {
  IonRouterLink,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonInput,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
} from "@ionic/react";
import React from "react";
import { RootPage } from "../../Components/RootPage";
import { routes } from "../../Utils";

export interface ILogin {}

export const Login: React.FC<ILogin> = (props: ILogin) => {
  let username;

  const handleSubmit = () => {
    console.log("neat");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Drinkentory</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={() => handleSubmit()}>
          <IonItem>
            <IonLabel position="floating">Floating Label</IonLabel>
            <IonInput type={"email"} value={username}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Floating Label</IonLabel>
            <IonInput type={"password"} value={username}></IonInput>
          </IonItem>
          <IonButton type="submit">Submit</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};
