import React from "react";
import { IonContent, IonToolbar, IonTitle, IonButtons, IonHeader, IonSearchbar, IonList, IonPage } from "@ionic/react";
import { withRouter, RouteComponentProps } from "react-router";
import { useBasePageWithSearchBarStyles } from "./BasePageWithSearchBar.styles";
import { ButtonLink } from "../../Components/ButtonLink";
import { IonItemLink } from "../../Components/IonItemLink";

// TODO: Add a selectRoute interface as well
export interface IAddNewItemModal {
  title: string;
  items: string[];
  closeRoute: {
    pathname: string;
    searchParamToDelete?: string;
  };
  notFoundRoute?: {
    pathname: string;
    searchParamToAdd?: string;
  };
}

const BasePageWithSearchBarComponent: React.FC<IAddNewItemModal & RouteComponentProps> = (props) => {
  const { location } = props;

  const searchParams = new URLSearchParams(location.search);

  const [searchText, setSearchText] = React.useState<string>("");
  const [showNotFound, setShowNotFound] = React.useState<boolean>(false);

  const classes = useBasePageWithSearchBarStyles();

  const { closeRoute, notFoundRoute, title, items } = props;

  React.useEffect(() => {
    if (searchText !== "") {
      notFoundRoute && setShowNotFound(true);
    } else {
      setShowNotFound(false);
    }
  }, [searchText]);

  const getCloseSearchText = () => {
    closeRoute.searchParamToDelete && searchParams.delete(closeRoute.searchParamToDelete);
    return `?${searchParams.toString()}`;
  };

  const getNotFoundSearchText = () => {
    const searchParam = notFoundRoute?.searchParamToAdd;
    return searchParam ? `${location.search}&${searchParam}=${searchText}` : location.search;
  };

  return (
    <>
      <IonPage>
        <IonHeader translucent>
          <IonToolbar>
            <IonTitle slot={"start"}>{title}</IonTitle>
            <IonButtons slot={"end"}>
              <ButtonLink to={{ pathname: closeRoute.pathname, search: getCloseSearchText() }}>Close</ButtonLink>
            </IonButtons>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar onIonChange={(event) => setSearchText(event.detail.value ? event.detail.value : "")} />
          </IonToolbar>
        </IonHeader>
        <IonContent className={classes.root}>
          <IonList>
            {items.map((item) => (
              <div></div>
            ))}
            {showNotFound && (
              <IonItemLink to={{ pathname: notFoundRoute?.pathname, search: getNotFoundSearchText() }}>
                Add&nbsp;<b>{searchText}?</b>
              </IonItemLink>
            )}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export const BasePageWithSearchBar = withRouter(BasePageWithSearchBarComponent);
