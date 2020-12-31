import React from "react";
import { BasePage } from "../../Components/BasePage";
import { IonList, IonSearchbar, IonIcon, IonAlert } from "@ionic/react";
import { addCircleOutline, filterOutline } from "ionicons/icons";
import { InventoryItem } from "../../Components/InventoryItem";
import { QuantityChangeDirection } from "../../Utils";
import { useInventoryStyles } from "./Inventory.styles";
import { Link } from "react-router-dom";
import { InventoryFilterPopover } from "../../Components/Popovers/InventoryFilterPopover";
import { connect, useDispatch, ConnectedProps } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { BeerDocument } from "../../Interfaces";
import { features } from "../../Utils";
import { actions, selectors } from "../../Redux";

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.beer.isWaitingOnFetch,
    currentBeer: selectors.beer.getCurrentBeer(state),
    domain: state.domain.domain,
    isWaitingOnBeerUpdate: state.beer.isWaitingOnBeerUpdate,
  };
};

export interface IInventory extends PropsFromRedux {}

const InventoryComponent: React.FC<IInventory> = (props) => {
  const dispatch = useDispatch();

  // TODO (2): Get search bar working
  const [searchBarText, setSearchBarText] = React.useState<string>("");
  const [beers, setBeers] = React.useState<BeerDocument[]>();
  const [showFilterPopover, setShowFilterPopover] = React.useState<boolean>(false);
  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  const [alertText, setAlertText] = React.useState<string>("");
  const [showLoadingAlert, setShowLoadingAlert] = React.useState<boolean>(false);

  const loadingAlertTimeout = React.useRef<NodeJS.Timeout>();
  const { isLoading, currentBeer, isWaitingOnBeerUpdate } = props;

  React.useEffect(() => {
    dispatch(actions.beer.fetchAllBeer());
  }, [dispatch]);

  React.useEffect(() => {
    // TODO (1): Populate fields if they aren't already expanded
    if (!isLoading) {
      setBeers(currentBeer);
    }
  }, [isLoading, currentBeer]);

  React.useEffect(() => {
    // We should only show loading spinner if the network request is taking a little while
    // Otherwise the loading spinner flashes on the screen
    if (isWaitingOnBeerUpdate) {
      loadingAlertTimeout.current = setTimeout(() => {
        setShowLoadingAlert(true);
      }, 100);
    } else {
      setShowLoadingAlert(false);
      loadingAlertTimeout.current && clearTimeout(loadingAlertTimeout.current);
    }
  }, [isWaitingOnBeerUpdate]);

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
      {features.inventoryFilters && <IonIcon icon={filterOutline} className={classes.filterIcon} onClick={() => setShowFilterPopover(true)} />}
      <IonSearchbar onIonChange={(event) => console.log(event.detail.value)} disabled={!features.inventorySearchbar}></IonSearchbar>
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
      <BasePage headerContent={toolbarHeaderContent} loadingSpinnerProps={{ show: showLoadingAlert, message: "Updating beer..." }}>
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
