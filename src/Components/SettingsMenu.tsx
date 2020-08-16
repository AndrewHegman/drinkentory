import React from "react";
import { IonLabel, IonItem, IonListHeader, IonRadioGroup, IonList, IonRadio } from "@ionic/react";
import { SegmentChangeEventDetail } from "@ionic/core";
import { ServerEndpoint } from "../Utils/Types";
import { config } from "../Utils/Constants";

require("dotenv");

export interface IServerSettingsProps {}
let defaultServerEndpoint: ServerEndpoint;

const sessionStorageEndpoint = sessionStorage.getItem(config.SERVER_ENDPOINT_KEY);

if (sessionStorageEndpoint && sessionStorageEndpoint in ServerEndpoint) {
  defaultServerEndpoint = sessionStorageEndpoint as ServerEndpoint;
} else {
  defaultServerEndpoint = process.env.IS_PROD ? ServerEndpoint.Production : ServerEndpoint.Localhost;
}

export const SettingsMenu: React.FC<IServerSettingsProps> = (props) => {
  const [serverEndpoint, setServerEndpoint] = React.useState<ServerEndpoint>(defaultServerEndpoint);

  React.useEffect(() => {
    sessionStorage.setItem(config.SERVER_ENDPOINT_KEY, serverEndpoint);
  }, [serverEndpoint]);

  const handleChange = (e: CustomEvent<SegmentChangeEventDetail>) => {
    setServerEndpoint(e.detail.value! as ServerEndpoint);
  };

  return (
    <>
      <IonList>
        <IonListHeader>
          <h5>Server Settings</h5>
        </IonListHeader>
        <IonRadioGroup onIonChange={handleChange} value={serverEndpoint}>
          <IonItem>
            <IonLabel>Development</IonLabel>
            <IonRadio value={ServerEndpoint.Development} />
          </IonItem>
          <IonItem>
            <IonLabel>Production</IonLabel>
            <IonRadio value={ServerEndpoint.Production} />
          </IonItem>
          <IonItem>
            <IonLabel>Localhost</IonLabel>
            <IonRadio value={ServerEndpoint.Localhost} />
          </IonItem>
        </IonRadioGroup>
      </IonList>
    </>
  );
};
