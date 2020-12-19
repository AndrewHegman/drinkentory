import React from "react";
import { IonButton, IonButtons } from "@ionic/react";
import { useHistory } from "react-router";

interface ICloseButtonProps {
  pathname: string;
  onClick?: () => void;
}

export const CloseButton: React.FC<ICloseButtonProps> = ({ pathname, onClick }) => {
  const history = useHistory();
  return (
    <IonButtons slot={"end"}>
      <IonButton routerDirection={"back"} routerLink={`${pathname}${history.location.search}`} onClick={onClick}>
        Close
      </IonButton>
    </IonButtons>
  );
};
