import React from "react";
import { routes } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { actions } from "../../Redux";
import { useSelector, useDispatch, connect, ConnectedProps } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { ListItemCountry } from "../../Components/ListItem";
import { IonItemLink } from "../../Components/IonItemLink";
import { selectors } from "../../Redux/";
export interface IAddNewItemModal extends PropsFromRedux {}

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: selectors.geography.isLoading(state),
    countries: state.geography.countries,
  };
};

export const SetBreweryCountryComponent: React.FC<IAddNewItemModal> = (props) => {
  const [searchText, setSearchText] = React.useState<string>("");

  const { createNewBreweryRoute } = routes;
  const dispatch = useDispatch();

  const initialSearchText = useSelector(selectors.breweries.getNewBreweryCountry);

  React.useEffect(() => {
    dispatch(actions.geography.fetchAllCountries());
  }, [dispatch, props.countries]);

  const onClick = (countryId: string) => {
    actions.breweries.setNewBreweryCountry(countryId);
  };

  const getContent = () => {
    if (props.isLoading) {
      return <></>;
    }
    return props.countries
      .filter((_breweries) => _breweries.name.toLowerCase().includes(searchText))
      .map((country) => (
        <IonItemLink
          to={{ pathname: createNewBreweryRoute.pathname }}
          onClick={() => {
            console.log(`Set ${country._id} as country`);
            onClick(country._id);
          }}
        >
          <ListItemCountry country={country.name} />
        </IonItemLink>
      ));
  };

  return (
    <BasePageWithSearchBar
      title="Choose a Country"
      pathname={createNewBreweryRoute.pathname}
      initialSearchText={initialSearchText}
      onSearchTextChange={(searchText) => setSearchText(searchText)}
    >
      {getContent()}
    </BasePageWithSearchBar>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const SetBreweryCountry = connector(SetBreweryCountryComponent);
