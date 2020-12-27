import React from "react";

import { routes } from "../../Utils/Routes";
import { BasePageWithInputCards } from "../../Components/BasePageWithInputCards/BasePageWithInputCards";
import { EditableInputCard } from "../../Components/EditableInputCard/EditableInputCard";
import { LinkInputCard } from "../../Components/LinkInputCard/LinkInputCard";
import { useDispatch, connect, ConnectedProps } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { actions } from "../../Redux";
import { RouteComponentProps } from "react-router";
import { IonAlert } from "@ionic/react";

const mapStateToProps = (state: RootState) => {
  return {
    name: state.beer.newBeer?.name || "",
    brewery: state.beer.newBeer?.brewery,
  };
};

export interface CreateNewItemProps extends PropsFromRedux, RouteComponentProps {}

const CreateNewItemComponent: React.FC<CreateNewItemProps> = (props) => {
  const { addNewItemRoute, setBreweryRoute, setStyleRoute } = routes;

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!props.name) {
      props.history.push(addNewItemRoute);
    }
  }, [addNewItemRoute, props.history, props.name]);

  return (
    <BasePageWithInputCards
      title={"Create new Beer"}
      onClosePathname={addNewItemRoute.pathname}
      showSubmit={true}
    >
      <EditableInputCard
        title={"Beer"}
        onChange={(event) => dispatch(actions.beer.setNewBeerName(event.detail.value || ""))}
        onBlur={() => {
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
      <LinkInputCard title={"Style"} pathname={setStyleRoute.pathname} content={"Style"} />
    </BasePageWithInputCards>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const CreateNewItem = connect(mapStateToProps)(CreateNewItemComponent);
