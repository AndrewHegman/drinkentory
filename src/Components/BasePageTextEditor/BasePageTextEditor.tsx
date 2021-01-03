import React from "react";
import { IonContent, IonHeader, IonList, IonPage } from "@ionic/react";
import { BasePageHeader } from "../BasePageHeader";
import { useBasePageTextEditorStyles } from "./BasePageTextEditor.styles";

export interface IBasePageTextEditorProps {
  title: string;
  onClosePathname: string;

  onClose?: () => void;
}

export const BasePageTextEditor: React.FC<IBasePageTextEditorProps> = (props) => {
  const { onClosePathname, title, onClose } = props;
  const classes = useBasePageTextEditorStyles();

  const onCloseButtonClick = () => {
    onClose && onClose();
  };
  return (
    <IonPage>
      <IonHeader>
        <BasePageHeader title={title} onClosePathname={onClosePathname} onClose={onCloseButtonClick} />
      </IonHeader>
      <IonContent className={classes.root}>
        <IonList>{props.children}</IonList>
      </IonContent>
    </IonPage>
  );
};
