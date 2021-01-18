import React from "react";
import { routes } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { RouteComponentProps } from "react-router";
import { RootState } from "../../Redux/Store/index";
import { connect, ConnectedProps } from "react-redux";
import { selectors } from "../../Redux";

export interface IAddNewItemModal extends RouteComponentProps, PropsFromRedux {}

const mapStateToProps = (state: RootState) => {
  return {
    domain: state.domain.domain,
    baseStyles: selectors.styles.getAllBaseStyles(state),
  };
};

export const SetBaseStyleComponent: React.FC<IAddNewItemModal> = (props) => {
  const [searchText, setSearchText] = React.useState<string>("");

  const { createNewStyleRoute } = routes;

  React.useEffect(() => {});

  // Just using a console log to hide warnings of unused variable
  console.log(searchText);

  return (
    <>
      <BasePageWithSearchBar
        title="Choose a Style"
        onClosePathname={createNewStyleRoute.pathname}
        onSearchTextChange={(searchText: string) => setSearchText(searchText)}
      />
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const SetBaseStyle = connector(SetBaseStyleComponent);
