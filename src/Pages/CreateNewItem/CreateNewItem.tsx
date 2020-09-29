import React from "react";

import { routes } from "../../Utils/Routes";
import { BasePageWithInputCards } from "../../Components/BasePageWithInputCards/BasePageWithInputCards";
import { EditableInputCard } from "../../Components/EditableInputCard/EditableInputCard";
import { LinkInputCard } from "../../Components/LinkInputCard/LinkInputCard";
import { useDispatch, connect } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { actions } from "../../Redux";

const mapStateToProps = (state: RootState) => {
  return {
    name: state.breweries.newBrewery?.name || "",
  };
};

export interface CreateNewItemProps {}

const CreateNewItemComponent: React.FC<CreateNewItemProps> = (props) => {
  const { addNewItemRoute, setBreweryRoute, setStyleRoute } = routes;
  const dispatch = useDispatch();

  const [name, setName] = React.useState<string>("");

  return (
    <BasePageWithInputCards title={"Create new Beer"} closeRoute={{ pathname: addNewItemRoute.pathname }}>
      <EditableInputCard
        title={"Beer"}
        onChange={(event) => setName(event.detail.value || "")}
        onBlur={() => {
          dispatch(actions.beer.setNewBeerName(name));
        }}
        value={name}
      />
      <LinkInputCard title={"Brewery"} pathname={setBreweryRoute.pathname} />
      <LinkInputCard title={"Style"} pathname={setStyleRoute.pathname} />
    </BasePageWithInputCards>
  );
};

export const CreateNewItem = connect(mapStateToProps)(CreateNewItemComponent);
