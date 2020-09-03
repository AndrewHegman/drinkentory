import React from "react";
import { BasePage } from "../Components/BasePage";
import { IonList, IonSearchbar, IonIcon } from "@ionic/react";
import { addCircleOutline, filterOutline } from "ionicons/icons";
import { InventoryItem } from "../Components/InventoryItem";
import { QuantityChangeDirection } from "../Utils/Types";
import { useInventoryStyles } from "./Inventory.styles";
import { Link } from "react-router-dom";
import { getWineIds, getBeerIds } from "../TestingUtils/API";
import { Domains } from "../Utils/Routes";
import { InventoryFilterPopover } from "../Components/Popovers/InventoryFilterPopover";
import { SearchParams } from "../Utils/Constants";
import * as queryString from "query-string";

export interface IInventory {}

export const Inventory: React.FC<IInventory> = (props: IInventory) => {
  const domain = queryString.parse(window.location.search)[SearchParams.Domain];

  const [searchBarText, setSearchBarText] = React.useState<string>("");
  const [inventoryIds, setInventoryIds] = React.useState<string[]>([]);
  const [showFilterPopover, setShowFilterPopover] = React.useState<boolean>(false);

  const classes = useInventoryStyles();

  React.useEffect(() => {
    if (domain === Domains.Beer) {
      setInventoryIds(getBeerIds());
    } else {
      setInventoryIds(getWineIds());
    }
  }, [domain]);

  const handleQuantityChange = (id: string, dir: QuantityChangeDirection) => {
    console.log(`${id} -- ${dir === 0 ? "Up" : "Down"}`);
  };

  const closeFilterPopover = () => {
    setShowFilterPopover(false);
  };

  const toolbarHeaderContent = (
    <div className={classes.headerContentContainer}>
      <IonIcon icon={filterOutline} className={classes.filterIcon} onClick={() => setShowFilterPopover(true)} />
      <IonSearchbar onIonChange={(event) => console.log(event.detail.value)}></IonSearchbar>
      <Link
        to={{
          pathname: "/inventory/add",
          search: window.location.search,
        }}
        className={classes.addItemLink}
      >
        <IonIcon icon={addCircleOutline} className={classes.addItemIcon} />
      </Link>
    </div>
  );

  return (
    <>
      <BasePage headerContent={toolbarHeaderContent}>
        <IonList>
          {inventoryIds.map((id) => (
            <InventoryItem key={id} onQuantityChange={(dir) => handleQuantityChange("1", dir)} id={id} />
          ))}
        </IonList>
      </BasePage>
      <InventoryFilterPopover isOpen={showFilterPopover} onClose={() => closeFilterPopover()} />
    </>
  );
};
