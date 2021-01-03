import React from "react";
import { IonItem, IonIcon, IonText, useIonRouter } from "@ionic/react";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";
import { useInventoryItemStyles } from "./InventoryItem.styles";
import { QuantityChangeDirection, routes } from "../../Utils/";
import { BeerDocument } from "../../Interfaces/Beer.types";
import { ListItemBeer } from "../ListItem";
import { MoreInfoAlert } from "../Alerts";

interface IBaseInventoryItemProps {
  beer: BeerDocument;
  onQuantityChange: (dir: QuantityChangeDirection) => void;
}

export const InventoryItem: React.FC<IBaseInventoryItemProps> = (props) => {
  const [content, setContent] = React.useState<React.ReactNode>();
  const [showMoreInfoAlert, setShowMoreInfoAlert] = React.useState<boolean>(false);
  const ionRouter = useIonRouter();

  const { onQuantityChange, beer } = props;

  const classes = useInventoryItemStyles();

  React.useEffect(() => {
    setContent(<ListItemBeer beer={beer} />);
  }, [beer]);

  return (
    <IonItem onClick={() => setShowMoreInfoAlert(true)}>
      <MoreInfoAlert
        message={"No information has been added about this beer"}
        onClose={() => setShowMoreInfoAlert(false)}
        onEdit={() => {
          setShowMoreInfoAlert(false);
          ionRouter.push(`${routes.editMoreInfo.pathname}${window.location.search}`);
        }}
        isOpen={showMoreInfoAlert}
      />
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
