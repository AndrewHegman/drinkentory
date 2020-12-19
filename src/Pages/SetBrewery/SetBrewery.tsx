import React from "react";
import { routes } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { actions } from "../../Redux";
import { useDispatch, connect, ConnectedProps } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { IonItemLink } from "../../Components/IonItemLink";
import { ListItemBrewery } from "../../Components/ListItem";

export interface ISetBreweryProps extends PropsFromRedux {}

const mapStateToProps = (state: RootState) => {
  return {
    breweries: state.breweries.breweries,
    domain: state.domain.domain,
    isLoading: state.breweries.isLoading,
  };
};

const SetBreweryComponent: React.FC<ISetBreweryProps> = (props) => {
  const [searchText, setSearchText] = React.useState<string>("");
  const { createNewBreweryRoute, createNewItemRoute } = routes;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.breweries.fetchAllBreweries());
  }, []);

  const onClick = (searchText: string) => {
    dispatch(actions.breweries.setNewBreweryName(searchText));
  };

  const getContent = () => {
    if (props.isLoading) {
      return "";
    }
    return props.breweries
      .filter((_breweries) => _breweries.name.toLowerCase().includes(searchText))
      .map((brewery) => (
        <IonItemLink
          pathname={createNewItemRoute.pathname}
          onClick={() => {
            dispatch(actions.beer.setNewBeerBrewery(brewery._id));
          }}
        >
          <ListItemBrewery brewery={brewery} />
        </IonItemLink>
      ));
  };

  return (
    <BasePageWithSearchBar
      title="Choose a Brewery"
      pathname={createNewItemRoute.pathname}
      notFoundRoute={{ pathname: createNewBreweryRoute.pathname }}
      onNotFoundClick={onClick}
      onSearchTextChange={(searchText: string) => setSearchText(searchText)}
    >
      {getContent()}
    </BasePageWithSearchBar>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const SetBrewery = connector(SetBreweryComponent);
