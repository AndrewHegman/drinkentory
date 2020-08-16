import React from "react";
import { IonPopover } from "@ionic/react";

export interface IInventoryFilterPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InventoryFilterPopover: React.FC<IInventoryFilterPopoverProps> = (props) => {
  const { isOpen, onClose } = props;

  return (
    <IonPopover isOpen={isOpen} onDidDismiss={() => onClose()}>
      <p>filter popover content</p>
    </IonPopover>
  );
};
