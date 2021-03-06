import React from "react";
import { IonItem, IonIcon, IonText } from "@ionic/react";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";
import { useInventoryItemStyles } from "./InventoryItem.styles";
import { QuantityChangeDirection } from "../../Utils/";
import { BeerDocument } from "../../Interfaces/Beer.types";
import { ListItemBeer } from "../ListItem";

interface IBaseInventoryItemProps {
  beer: BeerDocument;
  onQuantityChange: (dir: QuantityChangeDirection) => void;
}

export const InventoryItem: React.FC<IBaseInventoryItemProps> = (props) => {
  const [content, setContent] = React.useState<React.ReactNode>();
  const { onQuantityChange, beer } = props;

  const classes = useInventoryItemStyles();

  React.useEffect(() => {
    setContent(<ListItemBeer beer={beer} />);
  }, [beer]);

  return (
    <IonItem>
      {content}
      <IonIcon
        icon={addCircleOutline}
        className={classes.addButton}
        onClick={(e: any) => {
          e.stopPropagation();
          onQuantityChange(QuantityChangeDirection.Up);
        }}
      />
      <IonText style={{ fontSize: "30px", paddingLeft: "5px", paddingRight: "5px" }}>{beer.quantity}</IonText>
      <IonIcon
        icon={removeCircleOutline}
        className={classes.subtractButton}
        onClick={(e: any) => {
          e.stopPropagation();
          onQuantityChange(QuantityChangeDirection.Down);
        }}
      />
    </IonItem>
  );
};
