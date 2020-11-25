import React from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonInput, IonCardContent } from "@ionic/react";
import { InputChangeEventDetail } from "@ionic/core";
import { useEditableInputCardStyles } from "./EditableInputCard.styles";
export interface IEditableInputCard {
  title: string;
  onChange: (event: CustomEvent<InputChangeEventDetail>) => void;
  onBlur?: (event: CustomEvent<FocusEvent>) => void;
  value: string;
}

export const EditableInputCard: React.FC<IEditableInputCard> = ({ title, onChange, onBlur, value }) => {
  const classes = useEditableInputCardStyles();

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle className={classes.header}>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonInput className={classes.input} onIonChange={onChange} onIonBlur={onBlur} value={value} debounce={200} />
      </IonCardContent>
    </IonCard>
  );
};
