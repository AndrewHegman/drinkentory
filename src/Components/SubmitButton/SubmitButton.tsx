import React from "react";
import { IonButton } from "@ionic/react";
import { useSubmitButtonStyles } from "./SubmitButton.styles";

export interface ISubmitButtonProps {
  onSubmit: () => void;
}

export const SubmitButton: React.FC<ISubmitButtonProps> = ({ onSubmit }) => {
  const classes = useSubmitButtonStyles();
  return (
    <IonButton className={classes.submit} expand="block" onClick={onSubmit}>
      Submit
    </IonButton>
  );
};
