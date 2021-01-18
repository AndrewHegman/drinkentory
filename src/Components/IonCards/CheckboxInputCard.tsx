import React from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonChip, IonCardContent } from "@ionic/react";
import { InputChangeEventDetail } from "@ionic/core";
import { useCommonIonCardStyles } from "./CommonIonCard.styles";
import { containerKeys } from "../../Interfaces";

export interface ICheckboxInputCard {
  title: string;
  value: string;
  onChange?: (event: CustomEvent<InputChangeEventDetail>) => void;
  onBlur?: (event: CustomEvent<FocusEvent>) => void;
}

export const CheckboxInputCard: React.FC<ICheckboxInputCard> = ({ title }) => {
  const [selectedChip, setSelectedChip] = React.useState<string>("");

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
