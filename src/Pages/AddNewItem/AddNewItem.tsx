import React from "react";
import { routes } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { actions } from "../../Redux/";
import { useDispatch, connect, ConnectedProps } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { BeerDocument, Domains, WineDocument } from "../../Interfaces";
import { ClickableIonItem } from "../../Components/ClickableIonItem";
import { ListItemBeer } from "../../Components/ListItem";
import { QuantityAlert } from "../../Components/Alerts";
import { useIonRouter } from "@ionic/react/";

export interface IAddNewItemModal extends PropsFromRedux {}

const mapStateToProps = (state: RootState) => {
  return {
    beer: state.beer,
    domain: state.domain.domain,
  };
};

export const AddNewItemComponent: React.FC<IAddNewItemModal> = (props) => {
  const [beer, setBeer] = React.useState<BeerDocument[]>([]);
  const [wine, setWine] = React.useState<WineDocument[]>([]);
  const [searchText, setSearchText] = React.useState<string>("");
  const [showNotFound, setShowNotFound] = React.useState<boolean>(false);
  const [quantityErrorMessage, setQuantityErrorMessage] = React.useState<string>("");
  const [showQuantityAlert, setShowQuantityAlert] = React.useState<boolean>(false);
  const beerId = React.useRef<string>("");

  const { inventoryRoute, createNewItemRoute } = routes;
  const dispatch = useDispatch();
  const ionRouter = useIonRouter();

  React.useEffect(() => {
    dispatch(actions.beer.fetchAllBeer());
  }, [dispatch]);

  React.useEffect(() => {
    if (props.domain === Domains.Beer) {
      if (!props.beer.isWaitingOnFetch) {
        setBeer(props.beer.inventory);
      }
    } else {
      // Process for WINE
      setWine([]);
    }
  }, [props]);

  React.useEffect(() => {
    if (searchText === "" || props.beer.inventory.find((beer) => beer.name.toLowerCase() === searchText.toLowerCase())) {
      setShowNotFound(false);
    } else {
      setShowNotFound(true);
    }
  }, [searchText, props.beer.inventory]);

  const getContent = () => {
    if (props.domain === Domains.Beer) {
      return beer
        .filter((_beer) => _beer.name.toLowerCase().includes(searchText.toLowerCase()))
        .map((item) => (
          <ClickableIonItem
            onClick={() => {
              beerId.current = item._id;
              setShowQuantityAlert(true);
              return false;
            }}
          >
            <ListItemBeer beer={item} />
          </ClickableIonItem>
        ));
    } else if (props.domain === Domains.Wine) {
      return wine
        .filter((_wine) => _wine.name.toLowerCase().includes(searchText.toLowerCase()))
        .map((item) => (
          <ClickableIonItem
            pathname={inventoryRoute.pathname}
            onClick={() => {
              // console.log(`Add ${item._id} to inventory`);
            }}
          />
        ));
    }
  };

  const handleQuantitySubmit = (q: string) => {
    if (q === "" || parseInt(q) < 1) {
      setQuantityErrorMessage("Quantity must be a number greater than 0!");
      return false;
    }
    setShowQuantityAlert(false);
    dispatch(actions.beer.incrementBeerQuantity(beerId.current, parseInt(q)));
    ionRouter.push(inventoryRoute.pathname, "back");
    return true;
  };

  return (
    <BasePageWithSearchBar
      title="Choose a Beer"
      onClosePathname={inventoryRoute.pathname}
      onSearchTextChange={(searchText) => setSearchText(searchText)}
      showNotFound={showNotFound}
      onNotFoundClick={(text) => dispatch(actions.beer.setNewBeerName(text))}
      notFoundRoute={{
        pathname: createNewItemRoute.pathname,
      }}
    >
      <QuantityAlert
        onSubmit={(q) => handleQuantitySubmit(q)}
        onCancel={() => {
          setShowQuantityAlert(false);
          setQuantityErrorMessage("");
        }}
        isOpen={showQuantityAlert}
        errorMessage={quantityErrorMessage}
      />
      {getContent()}
    </BasePageWithSearchBar>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const AddNewItem = connect(mapStateToProps)(AddNewItemComponent);
