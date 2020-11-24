import React from "react";
import { routes } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { actions } from "../../Redux";
import { useSelector, useDispatch, connect, ConnectedProps } from "react-redux";
import { RootState } from "../../Redux/Store/index";

export interface ISetBreweryProps extends PropsFromRedux {}

const mapStateToProps = (state: RootState) => {
  return {
    domain: state.domain.domain,
  };
};

const SetBreweryComponent: React.FC<ISetBreweryProps> = (props) => {
  const [breweries, setBreweries] = React.useState<string[]>([]);
  const { createNewBreweryRoute, createNewItemRoute } = routes;
  const dispatch = useDispatch();

  const useInitialSearchText = () => useSelector((state: RootState) => state.breweries.newBrewery?.name);

  const onClick = (searchText: string) => {
    dispatch(actions.breweries.setNewBreweryName(searchText));
  };

  const initialSearchText = useInitialSearchText();

  return (
    <BasePageWithSearchBar
      title="Choose a Brewery"
      pathname={createNewItemRoute.pathname}
      notFoundRoute={{ pathname: createNewBreweryRoute.pathname }}
      onNotFoundClick={onClick}
      initialSearchText={initialSearchText}
    />
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const SetBrewery = connector(SetBreweryComponent);
