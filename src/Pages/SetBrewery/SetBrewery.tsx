import React from "react";
import { routes } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { SearchParams } from "../../Utils/Constants";
import { actions } from "../../Redux";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/Store/index";

export interface ISetBreweryProps {}

export const SetBrewery: React.FC<ISetBreweryProps> = (props) => {
  const [breweries, setBreweries] = React.useState<string[]>([]);
  const { createNewBreweryRoute, createNewItemRoute } = routes;
  const dispatch = useDispatch();

  const useInitialSearchText = () => useSelector((state: RootState) => state.breweries.newBrewery?.name);

  // console.log("SetBrewery*: ", initialSearchText);

  const onClick = (searchText: string) => {
    dispatch(actions.breweries.setNewBreweryName(searchText));
  };

  const initialSearchText = useInitialSearchText();

  return (
    <BasePageWithSearchBar
      title="Choose a Brewery"
      items={breweries}
      pathname={createNewItemRoute.pathname}
      notFoundRoute={{ pathname: createNewBreweryRoute.pathname }}
      onClick={onClick}
      initialSearchText={initialSearchText}
    />
  );
};
