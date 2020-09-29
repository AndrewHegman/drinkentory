import React from "react";
import { routes } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { actions } from "../../Redux";
import { getBreweryCountry } from "../../Redux/Store/Breweries/Selectors";
import { useSelector, useDispatch } from "react-redux";

export interface IAddNewItemModal {}

export const SetBreweryCountry: React.FC<IAddNewItemModal> = (props) => {
  const [countries, setCountries] = React.useState<string[]>([]);
  const { createNewBreweryRoute } = routes;
  const dispatch = useDispatch();
  // const { location, ...otherProps } = props;

  const initialSearchText = useSelector(getBreweryCountry);
  // console.log("SetBreweryCountry*: ", initialSearchText);

  const onClick = (searchText: string) => {
    dispatch(actions.breweries.setNewBreweryCountry(searchText));
  };

  return (
    <>
      <BasePageWithSearchBar
        title="Choose a Country"
        items={countries}
        closeRoute={{ pathname: createNewBreweryRoute.pathname }}
        onClick={onClick}
        initialSearchText={initialSearchText}
        parent={"SetBreweryCountry: "}
        // {...otherProps}
      />
    </>
  );
};
