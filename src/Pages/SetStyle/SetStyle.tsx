import React from "react";
import { routes } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { RouteComponentProps } from "react-router";
import { RootState } from "../../Redux/Store/index";
import { useDispatch, connect, ConnectedProps } from "react-redux";
import { actions } from "../../Redux";
import { ClickableIonItem } from "../../Components/ClickableIonItem";
import { ListItemStyle } from "../../Components/ListItem";
import { features } from "../../Utils";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export interface IAddNewItemModal extends RouteComponentProps, PropsFromRedux {}

const mapStateToProps = (state: RootState) => {
  return {
    domain: state.domain.domain,
    styles: state.styles.styles,
    isLoading: state.styles.isLoadingStyles,
  };
};

export const SetStyleComponent: React.FC<IAddNewItemModal> = (props) => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [showNotFound, setShowNotFound] = React.useState<boolean>(false);

  const { createNewItemRoute, createNewStyleRoute } = routes;
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  React.useEffect(() => {
    dispatch(actions.styles.fetchAllStyles());
  }, [dispatch]);

  React.useEffect(() => {
    if (searchText === "" || props.styles.find((style) => style.name.toLowerCase() === searchText.toLowerCase())) {
      setShowNotFound(false);
    } else {
      setShowNotFound(true);
    }
  }, [searchText, props.styles]);

  const onNotFoundClick = (searchText: string) => {
    if (features.baseStyle) {
      // If we are using base styles, we want to only set the new name and bring up the page to
      // create the base style, don't create anything yet
      dispatch(actions.styles.setNewStyleName(searchText));
    } else {
      // If we aren't using base styles, there is no more input needed from the user so go ahead
      // and create the new style
      dispatch(actions.styles.addNewStyle(searchText)).then((res) => {
        if (res.type === "ADD_NEW_STYLE_FINISHED") {
          dispatch(actions.beer.setNewBeerStyle(res.style._id));
        } else {
          // there should be an error modal showing at this point (controlled in Redux)
        }
      });
    }
  };

  const getContent = () => {
    if (props.isLoading) {
      return "";
    }

    return props.styles
      .filter((style) => style.name.toLowerCase().includes(searchText.toLowerCase()))
      .map((style) => (
        <ClickableIonItem
          pathname={createNewItemRoute.pathname}
          routerDirection={"back"}
          onClick={() => {
            dispatch(actions.beer.setNewBeerStyle(style._id));
            return true;
          }}
        >
          <ListItemStyle name={style.name} />
        </ClickableIonItem>
      ));
  };

  return (
    <>
      <BasePageWithSearchBar
        title="Choose a Style"
        onClosePathname={createNewItemRoute.pathname}
        onSearchTextChange={(searchText: string) => setSearchText(searchText)}
        showNotFound={showNotFound}
        notFoundRoute={{ pathname: features.baseStyle ? createNewStyleRoute.pathname : createNewItemRoute.pathname }}
        notFoundRouteDirection={"back"}
        onNotFoundClick={onNotFoundClick}

        // {...props}
      >
        {getContent()}
      </BasePageWithSearchBar>
    </>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const SetStyle = connector(SetStyleComponent);
