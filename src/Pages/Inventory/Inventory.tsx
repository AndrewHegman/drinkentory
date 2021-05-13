import React from "react";
import { RootPage } from "../../Components/RootPage";
import { IonList, IonSearchbar, IonIcon, IonItem } from "@ionic/react";
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
import { NetworkErrorAlert } from "../../Components/Alerts";
import { SkeletonLoading } from "../../Components/SkeletonLoading";

const mapStateToProps = (state: RootState) => {
  return {
    currentBeer: selectors.beer.getCurrentBeer(state),
    domain: state.domain.domain,
    isWaitingOnAddNewBeer: state.beer.isWaitingOnAddNewBeer,
    isWaitingOnBeerUpdate: state.beer.isWaitingOnBeerUpdate,
    isWaitingOnBeerFetch: state.beer.isWaitingOnFetch,
    isNetworkError: state.common.isNetworkError,
  };
};

export interface IInventory extends PropsFromRedux {}

const InventoryComponent: React.FC<IInventory> = (props) => {
  const dispatch = useDispatch();

  // TODO (2): Get search bar working
  const [beers, setBeers] = React.useState<BeerDocument[]>();
  const [searchbarText, setSearchbarText] = React.useState<string>("");
  const [showFilterPopover, setShowFilterPopover] = React.useState<boolean>(false);
  const [showLoadingAlert, setShowLoadingAlert] = React.useState<boolean>(false);
  const [loadingAlertMessage, setLoadingAlertMessage] = React.useState<string>("");
  const [inventoryTotal, setInventoryTotal] = React.useState<number>(0);

  const waitingOnUpdateTimeout = React.useRef<NodeJS.Timeout>();
  const waitingOnFetchTimeout = React.useRef<NodeJS.Timeout>();

  const { currentBeer, isWaitingOnBeerUpdate, isWaitingOnBeerFetch, isNetworkError } = props;

  React.useEffect(() => {
    dispatch(actions.beer.fetchAllBeer());
  }, [dispatch]);

  React.useEffect(() => {
    // TODO (1): Populate fields if they aren't already expanded
    if (!isWaitingOnBeerFetch) {
      setBeers(currentBeer);
      setInventoryTotal(currentBeer.reduce((count, beer) => (count += beer.quantity), 0));
    }
  }, [isWaitingOnBeerFetch, currentBeer]);

  React.useEffect(() => {
    // We should only show loading spinner if the network request is taking a little while
    // Otherwise the loading spinner flashes on the screen
    if (isWaitingOnBeerUpdate && !isNetworkError) {
      waitingOnUpdateTimeout.current = setTimeout(() => {
        setLoadingAlertMessage("Please wait...");
        setShowLoadingAlert(true);
      }, 100);
    } else {
      setShowLoadingAlert(false);
      waitingOnUpdateTimeout.current && clearTimeout(waitingOnUpdateTimeout.current);
    }
  }, [isWaitingOnBeerUpdate, isNetworkError]);

  React.useEffect(() => {
    if (isNetworkError) {
      setShowLoadingAlert(false);
    }
  }, [isNetworkError]);

  React.useEffect(() => {
    if (isWaitingOnBeerFetch && !isNetworkError) {
      // Don't show error message for 100ms (to prevent it from flickering)
      waitingOnFetchTimeout.current = setTimeout(() => {
        setLoadingAlertMessage("Loading current inventory...this may take some time");
        setShowLoadingAlert(true);
      }, 100);
    } else {
      setShowLoadingAlert(false);
      waitingOnFetchTimeout.current && clearTimeout(waitingOnFetchTimeout.current);
    }
  }, [isWaitingOnBeerFetch, isNetworkError]);

  const handleQuantityChange = (id: string, dir: QuantityChangeDirection) => {
    if (dir === QuantityChangeDirection.Up) {
      dispatch(actions.beer.incrementBeerQuantity(id));
    } else {
      dispatch(actions.beer.decrementBeerQuantity(id));
    }
  };

  const closeFilterPopover = () => {
    setShowFilterPopover(false);
  };

  const getContent = () => {
    if (beers) {
      const lowerSearchString = searchbarText.toLowerCase();
      return beers
        .filter(
          (beer) =>
            beer.name.toLowerCase().includes(lowerSearchString) ||
            beer.style.name.toLowerCase().includes(lowerSearchString) ||
            beer.brewery.name.toLowerCase().includes(lowerSearchString)
        )
        .map((beer) => (
          <InventoryItem key={beer._id} onQuantityChange={(dir: QuantityChangeDirection) => handleQuantityChange(beer._id, dir)} beer={beer} />
        ));
    } else {
      return <SkeletonLoading length={8} />;
    }
  };

  const classes = useInventoryStyles();
  const toolbarHeaderContent = (
    <div className={classes.headerContentContainer}>
      {features.inventoryFilters && <IonIcon icon={filterOutline} className={classes.filterIcon} onClick={() => setShowFilterPopover(true)} />}
      <IonSearchbar onIonChange={(event) => setSearchbarText(event.detail.value || "")} disabled={!features.inventorySearchbar}></IonSearchbar>
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

  console.log();

  return (
    <>
      <RootPage headerContent={toolbarHeaderContent} loadingSpinnerProps={{ show: showLoadingAlert, message: loadingAlertMessage }}>
        <NetworkErrorAlert />
        <IonList>
          {getContent()}
          <IonItem className={classes.totalInventoryCountRow}>
            <div style={{ textAlign: "center", width: "100%" }}>{`Total beers: ${inventoryTotal}`}</div>
          </IonItem>
        </IonList>
      </RootPage>
      <InventoryFilterPopover isOpen={showFilterPopover} onClose={() => closeFilterPopover()} />
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const Inventory = connector(InventoryComponent);
