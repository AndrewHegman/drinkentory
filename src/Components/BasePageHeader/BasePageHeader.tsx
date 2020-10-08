import React from "react";
import { IonToolbar, IonTitle, IonButtons } from "@ionic/react";
import { CloseButton } from "../CloseButton/CloseButton";

export interface IBasePageHeaderProps {
  title: string;
  pathname: string;
}

export const BasePageHeader: React.FC<IBasePageHeaderProps> = (props: IBasePageHeaderProps) => {
  const { title, pathname } = props;
  return (
    <IonToolbar>
      <IonTitle>{title}</IonTitle>
      <IonButtons slot={"end"}>
        <CloseButton pathname={pathname} />
      </IonButtons>
    </IonToolbar>
  );
};
