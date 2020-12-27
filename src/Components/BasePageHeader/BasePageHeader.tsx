import React from "react";
import { IonToolbar, IonTitle, IonButtons } from "@ionic/react";
import { CloseButton } from "../CloseButton/CloseButton";

export interface IBasePageHeaderProps {
  title: string;
  onClosePathname: string;
  onClose?: () => void;
}

export const BasePageHeader: React.FC<IBasePageHeaderProps> = (props: IBasePageHeaderProps) => {
  const { title, onClosePathname, onClose } = props;
  return (
    <IonToolbar>
      <IonTitle>{title}</IonTitle>
      <IonButtons slot={"end"}>
        <CloseButton pathname={onClosePathname} onClick={onClose} />
      </IonButtons>
    </IonToolbar>
  );
};
