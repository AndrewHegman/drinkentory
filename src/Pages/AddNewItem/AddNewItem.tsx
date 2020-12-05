import React from "react";
import { routes } from "../../Utils/Routes";
import { SearchParams } from "../../Utils/Constants";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { actions } from "../../Redux/";
import { useDispatch, connect, ConnectedProps } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { BeerDocument, Domains, WineDocument } from "../../Interfaces";
import { IonItemLink } from "../../Components/IonItemLink";
import { ListItemBeer } from "../../Components/ListItem";
import { useHistory } from "react-router";
import * as queryString from "query-string";

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

  const history = useHistory();

  const { inventoryRoute, createNewItemRoute } = routes;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.beer.fetchAllBeer());
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
      return beer
        .filter((_beer) => _beer.name.toLowerCase().includes(searchText.toLowerCase()))
        .map((item) => (
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
      return wine
        .filter((_wine) => _wine.name.toLowerCase().includes(searchText.toLowerCase()))
        .map((item) => (
          <IonItemLink
            to={{ pathname: inventoryRoute.pathname }}
            onClick={() => {
              console.log(`Add ${item._id} to inventory`);
            }}
          />
        ));
    }
  };

  const getSearchText = (text: string) => {
    const urlParams = queryString.parse(history.location.search);
    urlParams[SearchParams.NewName] = text;
    return `?${queryString.stringify(urlParams)}`;
  };

  return (
    <BasePageWithSearchBar
      title="Choose a Beer"
      pathname={inventoryRoute.pathname}
      onSearchTextChange={(searchText) => setSearchText(searchText)}
      onNotFoundClick={(text) => dispatch(actions.beer.setNewBeerName(text))}
      notFoundRoute={{
        pathname: createNewItemRoute.pathname,
        search: getSearchText(searchText),
      }}
    >
      {getContent()}
    </BasePageWithSearchBar>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const AddNewItem = connect(mapStateToProps)(AddNewItemComponent);
