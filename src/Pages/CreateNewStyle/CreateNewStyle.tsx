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
import { useIonRouter } from "@ionic/react/";

const mapStateToProps = (state: RootState) => {
  return {
    name: state.styles.newStyle.name || "",
    newStyle: state.styles.newStyle,
  };
};

export interface ICreateNewStyleProps extends PropsFromRedux {}

const CreateNewStyleComponent: React.FC<ICreateNewStyleProps> = (props) => {
  const { setBaseStyleRoute, setStyleRoute } = routes;
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
    const { newStyle } = props;

    if (Object.keys(newStyle).length > 0) {
      return `${newStyle.name}`;
    } else {
      return "Chocolate Vanilla Milkshake IPA with Bananas";
    }
  };

  const onClose = () => {
    // TODO (2): Should show some sort of confirmation dialog here
    dispatch(actions.breweries.resetNewBrewery());
  };

  const handleSubmit = () => {
    const { newStyle } = props;
    // TODO (2): Should show a confirmation dialog here

    if (newStyle.name && newStyle.baseStyle) {
      ionRouter.push(`${routes.createNewItemRoute.pathname}${window.location.search}`);
      dispatch(actions.styles.addNewStyleWithBaseStyle(newStyle));
    }
  };

  return (
    <BasePageWithInputCards
      title={"Create new Style"}
      onClosePathname={setStyleRoute.pathname}
      onClose={onClose}
      showSubmit={true}
      onSubmitClick={handleSubmit}
      loadingSpinnerProps={{
        show: false,
        message: "Please wait...",
      }}
    >
      <EditableInputCard
        title={"Style"}
        onChange={(event) => setName(event.detail.value || "")}
        onBlur={() => {
          dispatch(actions.styles.setNewStyleName(name));
        }}
        value={name}
      />
      <LinkInputCard title={"Base Style"} pathname={setBaseStyleRoute.pathname} content={getLocationPlaceholder()} />
    </BasePageWithInputCards>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const CreateNewStyle = connect(mapStateToProps)(CreateNewStyleComponent);
