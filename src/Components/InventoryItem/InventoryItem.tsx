import React from "react";
import { IonItem, IonLabel, IonIcon, IonText } from "@ionic/react";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";
import { useInventoryItemStyles } from "./InventoryItem.styles";
import { getBeer } from "../../TestingUtils/API/Beer";
import { getWine } from "../../TestingUtils/API/Wine";
import { Domains, QuantityChangeDirection } from "../../Utils";

interface IBaseInventoryItemProps {
  domain: Domains;
  id: string;
  onQuantityChange: (dir: QuantityChangeDirection) => void;
}

export const InventoryItem: React.FC<IBaseInventoryItemProps> = (props) => {
  const [content, setContent] = React.useState<React.ReactNode>();
  const { id, onQuantityChange, domain } = props;

  const classes = useInventoryItemStyles();

  React.useEffect(() => {
    // const domain = location.search.match(/.*domain=([^&|\n|\t\s]+)/);
    if (domain === Domains.Wine) {
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
  }, [id]);

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
