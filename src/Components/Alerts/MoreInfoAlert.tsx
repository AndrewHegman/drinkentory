import React from "react";

import { AlertButton, IonAlert } from "@ionic/react";

export interface IMoreInfoAlertProps {
  onClose: () => void;
  onEdit: () => void;
  isOpen: boolean;
  message: string;
}

export const MoreInfoAlert: React.FC<IMoreInfoAlertProps> = (props) => {
  const getButtons = (): AlertButton[] => {
    return [
      {
        text: "Close",
        handler: () => props.onClose(),
      },
      {
        text: "Edit",
        handler: () => props.onEdit(),
      },
    ];
  };

  return <IonAlert header={"More Info"} isOpen={props.isOpen} buttons={getButtons()} message={props.message} />;
};
