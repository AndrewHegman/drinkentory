import React from "react";

import { routes } from "../../Utils/Routes";
import { BasePageWithInputCards } from "../../Components/BasePageWithInputCards/BasePageWithInputCards";
import { EditableInputCard } from "../../Components/EditableInputCard/EditableInputCard";
import { LinkInputCard } from "../../Components/LinkInputCard/LinkInputCard";
import { RootState } from "../../Redux/Store/index";
import { useDispatch, connect, ConnectedProps } from "react-redux";
import { actions } from "../../Redux";
import { IonLoading } from "@ionic/react";

const mapStateToProps = (state: RootState) => {
  return {
    name: state.breweries.newBrewery?.name || "",
    newBrewery: state.breweries.newBrewery,
    isNewBreweryLocationUpdating: state.breweries.updatingNewBreweryLocation,
  };
};

export interface CreateNewBreweryProps extends PropsFromRedux {}

const CreateNewBreweryComponent: React.FC<CreateNewBreweryProps> = (props) => {
  const { setBreweryRoute, setBreweryCountryRoute } = routes;
  const dispatch = useDispatch();

  const [name, setName] = React.useState<string>(props.name);
  const [showLoadingSpinner, setShowLoadingSpinner] = React.useState<boolean>(false);

  React.useEffect(() => {
    setName(props.name);
  }, [props.name]);

  React.useEffect(() => {
    setShowLoadingSpinner(props.isNewBreweryLocationUpdating);
  }, [props.isNewBreweryLocationUpdating]);

  const getLocationPlaceholder = () => {
    const { newBrewery } = props;
    if (!!newBrewery?.place.name) {
      return `${newBrewery.place.name}, ${
        newBrewery.place.state ? newBrewery.place.state.name : newBrewery.place.country.name
      }`;
    } else {
      return "Somewhere in the world";
    }
  };

  const onClose = () => {
    // TODO: Should show some sort of confirmation dialog here
    dispatch(actions.breweries.resetNewBrewery());
  };

  const handleSubmit = () => {
    // TODO: Should show a confirmation dialog here
    if (props.newBrewery) {
      dispatch(actions.geography.addNewPlace(props.newBrewery.place));
    }
    // dispatch(actions.breweries.createNewBrewery());
    // dispatch(actions.beer.setNewBeerBrewery());
  };

  return (
    <BasePageWithInputCards
      title={"Create new Brewery"}
      onClosePathname={setBreweryRoute.pathname}
      onClose={onClose}
      showSubmit={true}
      onSubmitClick={handleSubmit}
      onSubmitPathname={routes.createNewItemRoute.pathname}
    >
      <IonLoading spinner="lines" message="Please wait..." isOpen={showLoadingSpinner} />
      <EditableInputCard
        title={"Brewery"}
        onChange={(event) => setName(event.detail.value || "")}
        onBlur={() => {
          dispatch(actions.breweries.setNewBreweryName(name));
        }}
        value={name}
      />
      <LinkInputCard title={"Location"} pathname={setBreweryCountryRoute.pathname} content={getLocationPlaceholder()} />
    </BasePageWithInputCards>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const CreateNewBrewery = connect(mapStateToProps)(CreateNewBreweryComponent);
