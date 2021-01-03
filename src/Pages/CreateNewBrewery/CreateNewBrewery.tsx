import React from "react";

import { routes } from "../../Utils/Routes";
import { BasePageWithInputCards } from "../../Components/BasePageWithInputCards/BasePageWithInputCards";
import { EditableInputCard } from "../../Components/IonCards/EditableInputCard";
import { LinkInputCard } from "../../Components/IonCards/LinkInputCard";
import { RootState } from "../../Redux/Store/index";
import { useDispatch, connect, ConnectedProps } from "react-redux";
import { AnyAction } from "redux";
import { actions } from "../../Redux";
import { ThunkDispatch } from "redux-thunk";
import { useIonRouter } from "@ionic/react";

const mapStateToProps = (state: RootState) => {
  return {
    name: state.breweries.newBrewery.name,
    newBrewery: state.breweries.newBrewery,
    isNewBreweryLocationUpdating: state.breweries.updatingNewBreweryLocation,
  };
};

export interface CreateNewBreweryProps extends PropsFromRedux {}

const CreateNewBreweryComponent: React.FC<CreateNewBreweryProps> = (props) => {
  const { setBreweryRoute, setBreweryPlaceRoute } = routes;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const ionRouter = useIonRouter();

  const [name, setName] = React.useState<string>(props.name);

  React.useEffect(() => {
    dispatch(actions.geography.fetchAllPlaces());
  }, [dispatch]);

  React.useEffect(() => {
    setName(props.name);
  }, [props.name]);

  const getLocationPlaceholder = () => {
    const { newBrewery } = props;

    if (Object.keys(newBrewery.place).length > 0) {
      return `${newBrewery.place.name}, ${newBrewery.place.state ? newBrewery.place.state.name : newBrewery.place.country.name}`;
    } else {
      return "Somewhere in the world";
    }
  };

  const onClose = () => {
    // TODO (2): Should show some sort of confirmation dialog here
    dispatch(actions.breweries.resetNewBrewery());
  };

  const handleSubmit = () => {
    // TODO (2): Should show a confirmation dialog here
    if (Object.keys(props.newBrewery.place).length > 0) {
      ionRouter.push(`${routes.createNewItemRoute.pathname}${window.location.search}`);
      dispatch(actions.geography.addNewPlace(props.newBrewery.place)).then((res) => {
        dispatch(actions.breweries.createNewBrewery()).then((res) => {
          dispatch(actions.beer.setNewBeerBrewery(res.brewery._id));
        });
      });
    }
  };

  return (
    <BasePageWithInputCards
      title={"Create new Brewery"}
      onClosePathname={setBreweryRoute.pathname}
      onClose={onClose}
      showSubmit={true}
      onSubmitClick={handleSubmit}
      loadingSpinnerProps={{
        show: props.isNewBreweryLocationUpdating,
        message: "Please wait...",
      }}
    >
      <EditableInputCard
        title={"Brewery"}
        onChange={(event) => setName(event.detail.value || "")}
        onBlur={() => {
          dispatch(actions.breweries.setNewBreweryName(name));
        }}
        value={name}
      />
      <LinkInputCard title={"Location"} pathname={setBreweryPlaceRoute.pathname} content={getLocationPlaceholder()} />
    </BasePageWithInputCards>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const CreateNewBrewery = connect(mapStateToProps)(CreateNewBreweryComponent);
