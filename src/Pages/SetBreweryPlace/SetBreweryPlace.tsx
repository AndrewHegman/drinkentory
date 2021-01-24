import React from "react";
import { AnyAction } from "redux";
import { routes } from "../../Utils";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { useDispatch, connect, ConnectedProps } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { ListItemLocation } from "../../Components/ListItem";
import { ClickableIonItem } from "../../Components/ClickableIonItem";
import { selectors, actions } from "../../Redux";
import { SkeletonLoading } from "../../Components/SkeletonLoading";
import usePlacesAutocomplete, { Suggestion } from "use-places-autocomplete";
import { ThunkDispatch } from "redux-thunk";
import { PlaceDocument } from "../../Interfaces";

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: selectors.geography.isLoading(state),
    places: state.geography.places,
    placesService: state.geography.placesService,
    geocoderService: state.geography.geocoderService,
    getPlaceByPlaceId: (id: string) => selectors.geography.placeByPlaceId(state, id),
  };
};

export interface IAddNewItemModal extends PropsFromRedux {}

export const SetBreweryPlaceComponent: React.FC<IAddNewItemModal> = (props) => {
  const { createNewBreweryRoute } = routes;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const placesAutocomplete = usePlacesAutocomplete({
    requestOptions: {
      types: ["(cities)"],
    },
    debounce: 0, // debounce handled in BasePageWithSearchBar by the IonSearchBar component
  });

  // React.useEffect(() => {
  //   dispatch(actions.geography.initializeGeocodingService());
  //   dispatch(actions.geography.initializePlacesService());
  // }, [dispatch]);

  const handleItemClick = (suggestion: Suggestion) => {
    const setNewBreweryPlace = (place: PlaceDocument) => {
      dispatch(actions.breweries.setNewBreweryPlace(place));
    };

    const place = props.getPlaceByPlaceId(suggestion.place_id);
    if (!place) {
      dispatch(actions.breweries.waitOnUpdatingNewBreweryLocation());
      dispatch(actions.geography.getPlaceFromSuggestion(suggestion.terms[0].value, { placeId: suggestion.place_id })).then((place) => {
        setNewBreweryPlace(place.place);
        dispatch(actions.breweries.updatingNewBreweryLocationFinished());
      });
    } else {
      setNewBreweryPlace(place);
    }
  };

  const getContent = () => {
    const { suggestions } = placesAutocomplete;
    if (props.isLoading || !placesAutocomplete.ready || suggestions.loading) {
      return <SkeletonLoading length={8} />;
    }
    return suggestions.data.map((suggestion) => (
      <ClickableIonItem
        pathname={createNewBreweryRoute.pathname}
        onClick={() => {
          handleItemClick(suggestion);
          return true;
        }}
        routerDirection={"back"}
      >
        <ListItemLocation terms={suggestion.terms} />
      </ClickableIonItem>
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

export const SetBreweryPlace = connector(SetBreweryPlaceComponent);
