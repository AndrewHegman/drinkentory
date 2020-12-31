import React from "react";

import { routes } from "../../Utils/Routes";
import { BasePageWithInputCards } from "../../Components/BasePageWithInputCards/BasePageWithInputCards";
import { EditableInputCard, CheckboxInputCard, LinkInputCard } from "../../Components/IonCards";
import { useDispatch, connect, ConnectedProps } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { actions } from "../../Redux";
import { RouteComponentProps } from "react-router";
import { useIonRouter } from "@ionic/react";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

const mapStateToProps = (state: RootState) => {
  return {
    name: state.beer.newBeer.name || "",
    brewery: state.beer.newBeer.brewery,
    style: state.beer.newBeer.style,
    quantity: state.beer.newBeer.quantity,
    isNewBreweryLoading: state.breweries.isCreatingNewBrewery,
  };
};

export interface CreateNewItemProps extends PropsFromRedux, RouteComponentProps {}

const CreateNewItemComponent: React.FC<CreateNewItemProps> = (props) => {
  const { addNewItemRoute, setBreweryRoute, setStyleRoute, inventoryRoute } = routes;
  const ionRouter = useIonRouter();

  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  React.useEffect(() => {
    if (!props.name) {
      props.history.push(addNewItemRoute);
    }
  }, [addNewItemRoute, props.history, props.name]);

  const handleSubmit = () => {
    dispatch(actions.beer.addNewBeer());
    ionRouter.push(inventoryRoute.pathname, "back");
  };
  // TODO (3): Updating loading message to include brewery name
  return (
    <BasePageWithInputCards
      title={"Create new Beer"}
      onClosePathname={addNewItemRoute.pathname}
      showSubmit={true}
      onSubmitClick={handleSubmit}
      loadingSpinnerProps={{
        show: props.isNewBreweryLoading,
        message: "Creating new brewery...",
      }}
    >
      <EditableInputCard
        title={"Beer"}
        onChange={(event) => dispatch(actions.beer.setNewBeerName(event.detail.value || ""))}
        onBlur={() => {
          // TODO (1): Investigate WTF this is
          dispatch(actions.beer.setNewBeerName(props.name));
        }}
        value={props.name}
      />
      <LinkInputCard
        title={"Brewery"}
        pathname={setBreweryRoute.pathname}
        search={props.history.location.search}
        content={props.brewery?.name || "Brewery"}
      />
      <LinkInputCard title={"Style"} pathname={setStyleRoute.pathname} search={props.history.location.search} content={props.style.name || "Style"} />
      <CheckboxInputCard title={"Container"} value={""} />
      <EditableInputCard
        title={"Quantity"}
        onChange={(event) => event.detail.value && dispatch(actions.beer.setNewBeerQuantity(parseInt(event.detail.value)))}
        value={props.quantity}
        inputType={"number"}
      />
    </BasePageWithInputCards>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const CreateNewItem = connect(mapStateToProps)(CreateNewItemComponent);
