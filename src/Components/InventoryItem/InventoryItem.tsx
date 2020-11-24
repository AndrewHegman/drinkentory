import React from "react";
import { IonItem, IonLabel, IonIcon, IonText } from "@ionic/react";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";
import { useInventoryItemStyles } from "./InventoryItem.styles";
import { QuantityChangeDirection } from "../../Utils/";
import { Domains } from "../../Interfaces";
import { BeerExpanded } from "../../Interfaces/Beer.types";
import { getExpandedBeerById } from "../../Redux/Store/Beer/Selectors";
import { RootState } from "../../Redux/Store/index";
import { connect } from "react-redux";
import { ListItemBeer } from "../ListItem";
interface IBaseInventoryItemProps {
  domain: Domains;
  id: string;
  onQuantityChange: (dir: QuantityChangeDirection) => void;
}

const mapStateToProps = (state: RootState, props: IBaseInventoryItemProps) => {
  return {
    item: getExpandedBeerById(state, props.id),
  };
};

const InventoryItemComponent: React.FC<IBaseInventoryItemProps & { item: BeerExpanded | undefined }> = (props) => {
  const [content, setContent] = React.useState<React.ReactNode>();
  const { onQuantityChange, domain, item } = props;

  const classes = useInventoryItemStyles();

  React.useEffect(() => {
    if (item) {
      setContent(
        // Based on `domain`, ListItem will automagically decide to use beer or wine
        <ListItemBeer beer={item} />
      );
    }
  }, [item]);

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
      <IonText style={{ fontSize: "30px", paddingLeft: "5px", paddingRight: "5px" }}>{item?.quantity}</IonText>
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

export const InventoryItem = connect(mapStateToProps)(InventoryItemComponent);
