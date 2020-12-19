import React from "react";
import { BasePage } from "../../Components/BasePage";
import { IonList, IonSearchbar, IonIcon, IonAlert } from "@ionic/react";
import { addCircleOutline, filterOutline } from "ionicons/icons";
import { InventoryItem } from "../../Components/InventoryItem";
import { QuantityChangeDirection, SearchParams } from "../../Utils";
import { useInventoryStyles } from "./Inventory.styles";
import { Link } from "react-router-dom";
import { InventoryFilterPopover } from "../../Components/Popovers/InventoryFilterPopover";
import { connect, useDispatch, ConnectedProps } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { BeerDocument } from "../../Interfaces";

import { actions, selectors } from "../../Redux";

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.beer.isLoading,
    currentBeer: selectors.beer.getCurrentBeer(state),
    domain: state.domain.domain,
  };
};

export interface IInventory extends PropsFromRedux {}

const InventoryComponent: React.FC<IInventory> = (props) => {
  const dispatch = useDispatch();

  const [searchBarText, setSearchBarText] = React.useState<string>("");
  const [beers, setBeers] = React.useState<BeerDocument[]>();
  const [showFilterPopover, setShowFilterPopover] = React.useState<boolean>(false);
  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  const [alertText, setAlertText] = React.useState<string>("");

  React.useEffect(() => {
    dispatch(actions.beer.fetchAllBeer());
  }, [dispatch]);

  React.useEffect(() => {
    if (!props.isLoading) {
      setBeers(props.currentBeer);
    }
  }, [props]);

  const handleQuantityChange = (id: string, dir: QuantityChangeDirection) => {
    try {
      if (dir === QuantityChangeDirection.Up) {
        dispatch(actions.beer.incrementBeerQuantity(id));
      } else {
        dispatch(actions.beer.decrementBeerQuantity(id));
      }
    } catch (error) {
      setAlertText(error);
      setShowAlert(true);
    }
  };

  const closeFilterPopover = () => {
    setShowFilterPopover(false);
  };

  const classes = useInventoryStyles();

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
        <IonAlert isOpen={showAlert} buttons={["Ok"]} message={alertText} onDidDismiss={() => setShowAlert(false)} />
        <IonList>
          {beers &&
            beers.map((beer) => (
              <InventoryItem key={beer._id} onQuantityChange={(dir: QuantityChangeDirection) => handleQuantityChange(beer._id, dir)} beer={beer} />
            ))}
          {!beers && <div>loading</div>}
        </IonList>
      </BasePage>
      <InventoryFilterPopover isOpen={showFilterPopover} onClose={() => closeFilterPopover()} />
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const Inventory = connector(InventoryComponent);
