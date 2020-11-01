import React from "react";
import { IonItem, IonLabel, IonIcon, IonText } from "@ionic/react";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";
import { useInventoryItemStyles } from "./InventoryItem.styles";
import { Domains, QuantityChangeDirection } from "../../Utils";
import { BeerExpanded } from "../../Interfaces/Beer.types";
import { getExpandedBeerById } from "../../Redux/Store/Beer/Selectors";
import { RootState } from "../../Redux/Store/index";
import { connect } from "react-redux";

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
    if (domain === Domains.Beer) {
      const beer = item;
      setContent(
        <IonLabel>
          <h1>{beer?.name}</h1>
          <h3>{beer?.brewery.name}</h3>
          <p>{beer?.style}</p>
        </IonLabel>
      );
    }
    // } else {
    //   const { name, brewery, style } = data as Beer;
    //   const breweryName = brewery instanceof Object ? brewery.name : brewery;
    //   setContent(
    //     <IonLabel>
    //       <p>{(data as Wine).producer}</p>
    //       <h1>{(data as Wine).name}</h1>
    //       <h3>{`${(data as Wine).varietal} ${(data as Wine).vintage}`}</h3>
    //       <p>{`${(data as Wine).region}, ${(data as Wine).country}`}</p>
    //     </IonLabel>
    //   );

    // }
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
