import React from "react";

import { routes } from "../../Utils/Routes";
import { SearchParams } from "../../Utils/Constants";
import { BasePageWithInputCards } from "../../Components/BasePageWithInputCards/BasePageWithInputCards";
import { EditableInputCard } from "../../Components/EditableInputCard/EditableInputCard";
import { LinkInputCard } from "../../Components/LinkInputCard/LinkInputCard";
import { useDispatch, connect, ConnectedProps } from "react-redux";
import { RootState } from "../../Redux/Store/index";
import { actions } from "../../Redux";
import { useHistory } from "react-router";
import { parse } from "query-string";

const mapStateToProps = (state: RootState) => {
  return {
    name: state.beer.newBeer?.name || "",
  };
};

export interface CreateNewItemProps extends PropsFromRedux {}

const CreateNewItemComponent: React.FC<CreateNewItemProps> = (props) => {
  const { addNewItemRoute, setBreweryRoute, setStyleRoute } = routes;
  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!props.name) {
      dispatch(actions.beer.setNewBeerName(parse(history.location.search)[SearchParams.NewName] as string));
    }
  });

  return (
    <BasePageWithInputCards title={"Create new Beer"} pathname={addNewItemRoute.pathname}>
      <EditableInputCard
        title={"Beer"}
        onChange={(event) => dispatch(actions.beer.setNewBeerName(event.detail.value || ""))}
        onBlur={() => {
          dispatch(actions.beer.setNewBeerName(props.name));
        }}
        value={props.name}
      />
      <LinkInputCard title={"Brewery"} pathname={setBreweryRoute.pathname} content={"Brewery"} />
      <LinkInputCard title={"Style"} pathname={setStyleRoute.pathname} content={"Style"} />
    </BasePageWithInputCards>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const CreateNewItem = connect(mapStateToProps)(CreateNewItemComponent);
