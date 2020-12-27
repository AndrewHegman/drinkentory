import React from "react";
import { AnyAction } from "redux";
import { routes } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { useDispatch, connect, ConnectedProps } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { ListItemLocation } from "../../Components/ListItem";
import { IonItemLink } from "../../Components/IonItemLink";
import { selectors, actions } from "../../Redux/";
import { SkeletonLoading } from "../../Components/SkeletonLoading";
import usePlacesAutocomplete, { Suggestion } from "use-places-autocomplete";
import { ThunkDispatch } from "redux-thunk";

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: selectors.geography.isLoading(state),
    places: state.geography.places,
  };
};

export interface IAddNewItemModal extends PropsFromRedux {}

export const SetBreweryCountryComponent: React.FC<IAddNewItemModal> = (props) => {
  const { createNewBreweryRoute } = routes;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const placesAutocomplete = usePlacesAutocomplete({
    requestOptions: {
      types: ["(cities)"],
    },
    debounce: 0, // debounce handled in BasePageWithSearchBar by the IonSearchBar component
  });

  React.useEffect(() => {
    dispatch(actions.geography.initializeGeocodingService());
    dispatch(actions.geography.initializePlacesService());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(actions.geography.fetchAllCountries());
  }, [dispatch]);

  const handleItemClick = (suggestion: Suggestion) => {
    dispatch(
      actions.geography.setNewBreweryLocationFromSuggestion(suggestion.terms[0].value, {
        placeId: suggestion.place_id,
      })
    );
  };

  const getContent = () => {
    const { suggestions } = placesAutocomplete;
    if (props.isLoading || !placesAutocomplete.ready || suggestions.loading) {
      return <SkeletonLoading length={8} />;
    }
    return suggestions.data.map((suggestion) => (
      <IonItemLink
        pathname={createNewBreweryRoute.pathname}
        onClick={() => {
          handleItemClick(suggestion);
        }}
        routerDirection={"back"}
      >
        <ListItemLocation terms={suggestion.terms} />
      </IonItemLink>
    ));
  };

  return (
    <BasePageWithSearchBar
      title="Choose the Location"
      onClosePathname={createNewBreweryRoute.pathname}
      onSearchTextChange={(_searchText) => {
        placesAutocomplete.setValue(_searchText, true);
      }}
    >
      {getContent()}
    </BasePageWithSearchBar>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const SetBreweryCountry = connector(SetBreweryCountryComponent);
