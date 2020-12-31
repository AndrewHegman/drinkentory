import React from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonInput, IonCardContent } from "@ionic/react";
import { InputChangeEventDetail, TextFieldTypes } from "@ionic/core";
import { useEditableInputCardStyles } from "./EditableInputCard.styles";
import { useCommonIonCardStyles } from "./CommonIonCard.styles";

export interface IEditableInputCard {
  title: string;
  value: string | number;
  inputType?: TextFieldTypes;
  onChange: (event: CustomEvent<InputChangeEventDetail>) => void;
  onBlur?: (event: CustomEvent<FocusEvent>) => void;
}

export const EditableInputCard: React.FC<IEditableInputCard> = ({ title, onChange, onBlur, value, inputType }) => {
  const classes = useEditableInputCardStyles();
  const commonClasses = useCommonIonCardStyles();
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle className={commonClasses.header}>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonInput className={classes.input} onIonChange={onChange} onIonBlur={onBlur} value={value} debounce={200} type={inputType || "text"} />
      </IonCardContent>
    </IonCard>
  );
};
