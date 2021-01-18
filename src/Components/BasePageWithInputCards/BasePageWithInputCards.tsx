import React from "react";
import { IonContent, IonPage, IonButton, IonLoading } from "@ionic/react";
import { BasePageHeader } from "../BasePageHeader";
import { NetworkErrorAlert } from "../Alerts";
import { SubmitButton } from "../SubmitButton";
import { BasePageContent } from "../BasePageContent";

export interface IBasePageWithInputCardsProps {
  title: string;
  onClosePathname: string;
  showSubmit: boolean;
  onClose?: () => void;
  loadingSpinnerProps?: {
    show: boolean;
    message: string;
  };
  onSubmitClick?: () => void;
}

export const BasePageWithInputCards: React.FC<IBasePageWithInputCardsProps> = (props) => {
  const { onClosePathname, onSubmitClick, title, onClose, loadingSpinnerProps, showSubmit } = props;

  return (
    <IonPage>
      <BasePageHeader title={title} onClosePathname={onClosePathname} onClose={onClose} />
      <BasePageContent>
        {loadingSpinnerProps && <IonLoading spinner="lines" message={loadingSpinnerProps.message} isOpen={loadingSpinnerProps.show} />}

        <NetworkErrorAlert />

        {props.children}

        {showSubmit && (
          <SubmitButton
            onSubmit={() => {
              onSubmitClick && onSubmitClick();
            }}
          />
        )}
      </BasePageContent>
    </IonPage>
  );
};
