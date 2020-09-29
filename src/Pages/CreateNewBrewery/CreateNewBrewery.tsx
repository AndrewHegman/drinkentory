import React from "react";

import { routes } from "../../Utils/Routes";
import { BasePageWithInputCards } from "../../Components/BasePageWithInputCards/BasePageWithInputCards";
import { EditableInputCard } from "../../Components/EditableInputCard/EditableInputCard";
import { LinkInputCard } from "../../Components/LinkInputCard/LinkInputCard";
import { RootState } from "../../Redux/Store/index";
import { useDispatch, connect } from "react-redux";
import { actions } from "../../Redux";

const mapStateToProps = (state: RootState) => {
  return {
    name: state.breweries.newBrewery?.name || "",
  };
};

export interface CreateNewBreweryProps {}

const CreateNewBreweryComponent: React.FC<CreateNewBreweryProps & { name: string }> = (props) => {
  const { setBreweryRoute, setBreweryCountryRoute } = routes;
  const dispatch = useDispatch();

  const [name, setName] = React.useState<string>(props.name);

  React.useEffect(() => {
    setName(props.name);
  }, [props.name]);

  return (
    <BasePageWithInputCards title={"Create new Brewery"} closeRoute={{ pathname: setBreweryRoute.pathname }}>
      <EditableInputCard
        title={"Brewery"}
        onChange={(event) => setName(event.detail.value || "")}
        onBlur={() => {
          dispatch(actions.breweries.setNewBreweryName(name));
        }}
        value={name}
      />
      <LinkInputCard title={"Country"} pathname={setBreweryCountryRoute.pathname} />
      <LinkInputCard title={"City"} pathname={setBreweryCountryRoute.pathname} />
    </BasePageWithInputCards>
  );
};

export const CreateNewBrewery = connect(mapStateToProps)(CreateNewBreweryComponent);
