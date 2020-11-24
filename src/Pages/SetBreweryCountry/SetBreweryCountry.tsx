import React from "react";
import { routes } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { actions } from "../../Redux";
import { getNewBreweryCountry } from "../../Redux/Store/Breweries/Selectors";
import { useSelector, useDispatch, connect, ConnectedProps } from "react-redux";
import { RootState } from "../../Redux/Store/index";

export interface IAddNewItemModal extends PropsFromRedux {}

const mapStateToProps = (state: RootState) => {
  return {
    domain: state.domain.domain,
  };
};

export const SetBreweryCountryComponent: React.FC<IAddNewItemModal> = (props) => {
  const [countries, setCountries] = React.useState<string[]>([]);
  const { createNewBreweryRoute } = routes;
  const dispatch = useDispatch();

  const initialSearchText = useSelector(getNewBreweryCountry);

  const onClick = (searchText: string) => {
    dispatch(actions.breweries.setNewBreweryCountry(searchText));
  };

  return (
    <BasePageWithSearchBar
      title="Choose a Country"
      pathname={createNewBreweryRoute.pathname}
      onNotFoundClick={onClick}
      initialSearchText={initialSearchText}
    />
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const SetBreweryCountry = connector(SetBreweryCountryComponent);
