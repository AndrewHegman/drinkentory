import React from "react";

import { routes } from "../../Utils/Routes";
import { BasePageWithInputCards } from "../../Components/BasePageWithInputCards/BasePageWithInputCards";
import { EditableInputCard } from "../../Components/EditableInputCard/EditableInputCard";
import { LinkInputCard } from "../../Components/LinkInputCard/LinkInputCard";
import { RootState } from "../../Redux/Store/index";
import { useDispatch, connect, ConnectedProps } from "react-redux";
import { actions } from "../../Redux";

const mapStateToProps = (state: RootState) => {
  return {
    name: state.breweries.newBrewery?.name || "",
    newBrewery: state.breweries.newBrewery,
  };
};

export interface CreateNewBreweryProps extends PropsFromRedux {}

const CreateNewBreweryComponent: React.FC<CreateNewBreweryProps> = (props) => {
  const { setBreweryRoute, setBreweryCountryRoute } = routes;
  const dispatch = useDispatch();

  const [name, setName] = React.useState<string>(props.name);

  React.useEffect(() => {
    setName(props.name);
  }, [props.name]);

  const getLocationPlaceholder = () => {
    const { newBrewery } = props;
    if (!!newBrewery?.city) {
      return `${newBrewery?.city ? `${newBrewery.city.name}, ${newBrewery.city.state?.name}` : newBrewery.country.name}`;
    } else {
      return "Somewhere in the world";
    }
  };

  const onClose = () => {
    // TODO: Should show some sort of confirmation dialog here
    dispatch(actions.breweries.resetNewBrewery());
  };

  return (
    <BasePageWithInputCards title={"Create new Brewery"} pathname={setBreweryRoute.pathname} onClose={onClose}>
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
