import React from "react";
import { routes } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { actions } from "../../Redux";
import { useSelector, useDispatch, connect, ConnectedProps } from "react-redux";
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
  console.log(props);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.breweries.fetchAllBreweries());
  }, []);

  const useInitialSearchText = () => useSelector((state: RootState) => state.breweries.newBrewery?.name);

  const onClick = (searchText: string) => {
    dispatch(actions.breweries.setNewBreweryName(searchText));
  };

  const initialSearchText = useInitialSearchText();

  const getContent = () => {
    if (props.isLoading) {
      return "";
    }
    console.log(props.breweries);
    return props.breweries
      .filter((_breweries) => _breweries.name.toLowerCase().includes(searchText))
      .map((brewery) => (
        <IonItemLink
          to={{ pathname: createNewItemRoute.pathname, search: "" }}
          onClick={() => {
            console.log(`Add ${brewery._id} to inventory`);
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
      initialSearchText={initialSearchText}
      onSearchTextChange={(searchText: string) => setSearchText(searchText)}
    >
      {getContent()}
    </BasePageWithSearchBar>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const SetBrewery = connector(SetBreweryComponent);
