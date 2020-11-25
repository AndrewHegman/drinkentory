import React from "react";
import { IonItem, IonLabel, IonIcon, IonText } from "@ionic/react";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";
import { useInventoryItemStyles } from "./InventoryItem.styles";
import { QuantityChangeDirection } from "../../Utils/";
import { BeerExpanded } from "../../Interfaces/Beer.types";
import { RootState } from "../../Redux/Store/index";
import { ListItemBeer } from "../ListItem";

interface IBaseInventoryItemProps {
  beer: BeerExpanded;
  onQuantityChange: (dir: QuantityChangeDirection) => void;
}

const mapStateToProps = (state: RootState) => {
  return {
    beer: state.beer.inventory,
    isLoading: state.beer.isLoading,
  };
};

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
