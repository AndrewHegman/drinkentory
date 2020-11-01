import React from "react";
import { IonAlert } from "@ionic/react";

export interface IAlertProps {
  shouldShow: boolean;
  onDismiss: () => void;
}

export const Alert: React.FC<IAlertProps> = (props) => {
  return <IonAlert isOpen={props.shouldShow} buttons={["Ok"]} message={"Message goes here"} onDidDismiss={props.onDismiss} />;
};
