import React from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonChip, IonCardContent } from "@ionic/react";
import { InputChangeEventDetail } from "@ionic/core";
import { useCheckboxInputCardStyles } from "./CheckboxInputCard.styles";
import { useCommonIonCardStyles } from "./CommonIonCard.styles";
import { Container, containerKeys } from "../../Interfaces";

export interface ICheckboxInputCard {
  title: string;
  value: string;
  onChange?: (event: CustomEvent<InputChangeEventDetail>) => void;
  onBlur?: (event: CustomEvent<FocusEvent>) => void;
}

export const CheckboxInputCard: React.FC<ICheckboxInputCard> = ({ title, onChange, onBlur, value }) => {
  const [selectedChip, setSelectedChip] = React.useState<string>("");

  const classes = useCheckboxInputCardStyles();
  const commonClasses = useCommonIonCardStyles();
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle className={commonClasses.header}>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {containerKeys.map((containerType) => (
          <IonChip
            onClick={() => setSelectedChip(containerType)}
            outline={selectedChip === containerType}
            color={selectedChip === containerType ? "primary" : "dark"}
          >
            {containerType}
          </IonChip>
        ))}
      </IonCardContent>
    </IonCard>
  );
};
