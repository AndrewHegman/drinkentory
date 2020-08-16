import React from "react";
import { IonItem, IonLabel, IonIcon, IonText } from "@ionic/react";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";
import { QuantityChangeDirection } from "../Utils/Types";
import { useInventoryItemStyles } from "./InventoryItem.styles";
import { getBeer } from "../TestingUtils/API/Beer";
import { getWine } from "../TestingUtils/API/Wine";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Domains } from "../Utils/Routes";

interface IBaseInventoryItemProps {
  id: string;
  onQuantityChange: (dir: QuantityChangeDirection) => void;
}

const InventoryItemComponent: React.FC<IBaseInventoryItemProps & RouteComponentProps> = (props) => {
  const [content, setContent] = React.useState<React.ReactNode>();
  const { id, onQuantityChange, location } = props;

  const classes = useInventoryItemStyles();

  React.useEffect(() => {
    const domain = location.search.match(/.*domain=([^&|\n|\t\s]+)/);

    if (domain && domain[1] === Domains.Wine) {
      const data = getWine(id);
      setContent(
        <IonLabel>
          <p>{data.producer}</p>
          <h1>{data.name}</h1>
          <h3>{`${data.varietal} ${data.vintage}`}</h3>
          <p>{`${data.region}, ${data.country}`}</p>
        </IonLabel>
      );
    } else {
      const data = getBeer(id);
      setContent(
        <IonLabel>
          <h1>{data.name}</h1>
          <h3>{data.brewery}</h3>
          <p>{data.style}</p>
        </IonLabel>
      );
    }
  }, [id, location.search]);

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
      <IonText style={{ fontSize: "30px", paddingLeft: "5px", paddingRight: "5px" }}>{12}</IonText>
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

export const InventoryItem = withRouter(InventoryItemComponent);
