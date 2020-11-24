import React from "react";
import { routes } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { RouteComponentProps } from "react-router";
import { RootState } from "../../Redux/Store/index";
import { useSelector, useDispatch, connect, ConnectedProps } from "react-redux";

export interface IAddNewItemModal extends RouteComponentProps, PropsFromRedux {}

const mapStateToProps = (state: RootState) => {
  return {
    domain: state.domain.domain,
  };
};

export const SetStyleComponent: React.FC<IAddNewItemModal> = (props) => {
  const [styles, setStyles] = React.useState<string[]>([]);
  const { createNewBreweryRoute } = routes;

  // TODO: Make sure that the appropriate route is used based on domain
  return (
    <>
      <BasePageWithSearchBar
        title="Choose a Style"
        pathname={createNewBreweryRoute.pathname}
        // {...props}
      />
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const SetStyle = connector(SetStyleComponent);
