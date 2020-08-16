import React from "react";
import { BasePage } from "../Components/BasePage";
import { IonList, IonSearchbar, IonIcon } from "@ionic/react";
import { addCircleOutline, filterOutline } from "ionicons/icons";
import { InventoryItem } from "../Components/InventoryItem";
import { QuantityChangeDirection } from "../Utils/Types";
import { useInventoryStyles } from "./Inventory.styles";
import { useHistory } from "react-router-dom";
import { AddNewItemModal } from "../Components/Modals/AddNewItemModal";
import { getWineIds, getBeerIds } from "../TestingUtils/API";
import { Domains } from "../Utils/Routes";
import { InventoryFilterPopover } from "../Components/Popovers/InventoryFilterPopover";

export interface IInventory {
  showAddModal: boolean;
}

export const Inventory: React.FC<IInventory> = (props: IInventory) => {
  const domain = new URLSearchParams(window.location.search).get("domain");
  const history = useHistory();

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

  const onAddItemClick = () => {
    history.push({
      pathname: `${history.location.pathname}/add`,
      search: history.location.search,
    });
  };

  const closeAddItemModal = () => {
    history.push({
      pathname: "/inventory",
      search: history.location.search,
    });
  };

  const closeFilterPopover = () => {
    setShowFilterPopover(false);
  };

  const toolbarHeaderContent = (
    <div className={classes.headerContentContainer}>
      <IonIcon icon={filterOutline} className={classes.filterIcon} onClick={() => setShowFilterPopover(true)} />
      <IonSearchbar onIonChange={(event) => console.log(event.detail.value)}></IonSearchbar>
      <IonIcon icon={addCircleOutline} onClick={onAddItemClick} className={classes.addItemIcon} />
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
      <AddNewItemModal onClose={() => closeAddItemModal()} />
      <InventoryFilterPopover isOpen={showFilterPopover} onClose={() => closeFilterPopover()} />
    </>
  );
};
