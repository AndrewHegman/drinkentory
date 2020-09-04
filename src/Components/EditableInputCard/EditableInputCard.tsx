import React from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonInput, IonCardContent } from "@ionic/react";
import { InputChangeEventDetail } from "@ionic/core";

export interface IEditableInputCard {
  title: string;
  onChange: (event: CustomEvent<InputChangeEventDetail>) => void;
  onBlur: (event: CustomEvent<FocusEvent>) => void;
  value: string;
}

export const EditableInputCard: React.FC<IEditableInputCard> = ({ title, onChange, onBlur, value }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonInput onIonChange={onChange} onIonBlur={onBlur} value={value} />
      </IonCardContent>
    </IonCard>
  );
};
