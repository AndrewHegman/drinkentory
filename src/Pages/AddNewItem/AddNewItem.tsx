import React from "react";
import { routes } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { fetchAllBeer } from "../../Redux/Store/Beer/Actions";
import { useDispatch, connect, ConnectedProps } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { Beer, BeerExpanded, Domains, Wine } from "../../Interfaces";
import { IonItemLink } from "../../Components/IonItemLink";
import { ListItemBeer } from "../../Components/ListItem";
import { getExpandedBeerById } from "../../Redux/Store/Beer/Selectors";

export interface IAddNewItemModal extends PropsFromRedux {}

const mapStateToProps = (state: RootState) => {
  return {
    beer: state.beer,
    domain: state.domain.domain,
  };
};

export const AddNewItemComponent: React.FC<IAddNewItemModal> = (props) => {
  const [beer, setBeer] = React.useState<BeerExpanded[]>([]);
  const [wine, setWine] = React.useState<Wine[]>([]);
  const { inventoryRoute, createNewItemRoute } = routes;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAllBeer());
  }, [dispatch]);

  React.useEffect(() => {
    if (props.domain === Domains.Beer) {
      if (!props.beer.isLoading) {
        setBeer(props.beer.inventory);
      }
    } else {
      // Process for WINE
      setWine([]);
    }
  }, [props]);

  const getContent = () => {
    if (props.domain === Domains.Beer) {
      return beer.map((item) => (
        <IonItemLink
          to={{ pathname: inventoryRoute.pathname }}
          onClick={() => {
            console.log(`Add ${item._id} to inventory`);
          }}
        >
          <ListItemBeer beer={item} />
        </IonItemLink>
      ));
    } else if (props.domain === Domains.Wine) {
      return wine.map((item) => (
        <IonItemLink
          to={{ pathname: inventoryRoute.pathname }}
          onClick={() => {
            console.log(`Add ${item._id} to inventory`);
          }}
        />
      ));
    }
  };

  return (
    <BasePageWithSearchBar
      title="Choose a Beer"
      pathname={inventoryRoute.pathname}
      notFoundRoute={{
        pathname: createNewItemRoute.pathname,
      }}
    >
      {getContent()}
    </BasePageWithSearchBar>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const AddNewItem = connect(mapStateToProps)(AddNewItemComponent);
