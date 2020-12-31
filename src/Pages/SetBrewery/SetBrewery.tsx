import React from "react";
import { routes } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { actions } from "../../Redux";
import { useDispatch, connect, ConnectedProps } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { ClickableIonItem } from "../../Components/ClickableIonItem";
import { ListItemBrewery } from "../../Components/ListItem";

export interface ISetBreweryProps extends PropsFromRedux {}

const mapStateToProps = (state: RootState) => {
  return {
    breweries: state.breweries.breweries,
    domain: state.domain.domain,
    isLoading: state.breweries.isBreweriesLoading,
  };
};

const SetBreweryComponent: React.FC<ISetBreweryProps> = (props) => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [showNotFound, setShowNotFound] = React.useState<boolean>(false);

  const { createNewBreweryRoute, createNewItemRoute } = routes;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.breweries.fetchAllBreweries());
  }, [dispatch]);

  React.useEffect(() => {
    if (searchText === "" || props.breweries.find((brewery) => brewery.name.toLowerCase() === searchText.toLowerCase())) {
      setShowNotFound(false);
    } else {
      setShowNotFound(true);
    }
  }, [searchText, props.breweries]);

  const onClick = (searchText: string) => {
    dispatch(actions.breweries.setNewBreweryName(searchText));
  };

  const getContent = () => {
    if (props.isLoading) {
      return "";
    }

    return props.breweries
      .filter((_breweries) => _breweries.name.toLowerCase().includes(searchText.toLowerCase()))
      .map((brewery) => (
        <ClickableIonItem
          pathname={createNewItemRoute.pathname}
          onClick={() => {
            dispatch(actions.beer.setNewBeerBrewery(brewery._id));
            return true;
          }}
          routerDirection={"back"}
        >
          <ListItemBrewery brewery={brewery} />
        </ClickableIonItem>
      ));
  };

  return (
    <BasePageWithSearchBar
      title="Choose a Brewery"
      onClosePathname={createNewItemRoute.pathname}
      notFoundRoute={{ pathname: createNewBreweryRoute.pathname }}
      onNotFoundClick={onClick}
      onSearchTextChange={(searchText: string) => setSearchText(searchText)}
      showNotFound={showNotFound}
    >
      {getContent()}
    </BasePageWithSearchBar>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const SetBrewery = connector(SetBreweryComponent);
