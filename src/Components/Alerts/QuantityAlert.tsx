import React, { useRef } from "react";

import { IonAlert, IonicSafeString } from "@ionic/react";

export interface IQuantityAlertProps {
  onSubmit: (quantity: string) => boolean;
  onCancel: () => void;
  isOpen: boolean;
  errorMessage?: string;
}

export const QuantityAlert: React.FC<IQuantityAlertProps> = (props) => {
  const alertRef = useRef<HTMLIonAlertElement>(null);

  React.useEffect(() => {
    if (alertRef.current) {
      alertRef.current.message = new IonicSafeString(`<div style="color:red;">${props.errorMessage}</div>`);
    }
  }, [props.errorMessage]);

  const getButtons = () => {
    return [
      {
        text: "Add!",
        handler: (data: any) => {
          return props.onSubmit(data.quantity);
        },
      },
      {
        text: "Cancel",
        handler: () => props.onCancel(),
      },
    ];
  };

  return (
    <IonAlert ref={alertRef} header={"How many?"} isOpen={props.isOpen} buttons={getButtons()} inputs={[{ name: "quantity", type: "number" }]} />
  );
};
