import React from "react";
import { IonHeader, IonPage } from "@ionic/react";
import { BasePageHeader } from "../BasePageHeader";
import { SubmitButton } from "../SubmitButton";
import { BasePageContent } from "../BasePageContent";

export interface IBasePageTextEditorProps {
  title: string;
  onClosePathname: string;
  onSubmit: () => void;
  onClose?: () => void;
}

export const BasePageTextEditor: React.FC<IBasePageTextEditorProps> = (props) => {
  const { onClosePathname, title, onClose, onSubmit } = props;

  const onCloseButtonClick = () => {
    onClose && onClose();
  };
  return (
    <IonPage>
      <IonHeader>
        <BasePageHeader title={title} onClosePathname={onClosePathname} onClose={onCloseButtonClick} />
      </IonHeader>
      <BasePageContent>
        <SubmitButton onSubmit={onSubmit} />
      </BasePageContent>
    </IonPage>
  );
};
