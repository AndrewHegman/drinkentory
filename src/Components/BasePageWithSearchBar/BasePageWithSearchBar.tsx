import React from "react";
import { IonContent, IonToolbar, IonTitle, IonButtons, IonHeader, IonSearchbar, IonList, IonPage, useIonViewWillEnter } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { useBasePageWithSearchBarStyles } from "./BasePageWithSearchBar.styles";
import { ButtonLink } from "../ButtonLink/ButtonLink";
import { IonItemLink } from "../IonItemLink/IonItemLink";
import { SearchParams } from "../../Utils/Constants";
import { CloseButton } from "../CloseButton/CloseButton";
import * as queryString from "query-string";

// TODO: Add a selectRoute interface as well
export interface IAddNewItemModal extends RouteComponentProps {
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

export const BasePageWithSearchBar: React.FC<IAddNewItemModal> = (props) => {
  const { closeRoute, notFoundRoute, title, items, history } = props;

  const [searchText, setSearchText] = React.useState<string>("");
  const [showNotFound, setShowNotFound] = React.useState<boolean>(false);
  const classes = useBasePageWithSearchBarStyles();

  React.useEffect(() => {
    if (searchText !== "") {
      notFoundRoute && setShowNotFound(true);
    } else {
      setShowNotFound(false);
    }
  }, [searchText, notFoundRoute]);

  const getCloseSearchText = () => {
    const searchParams = queryString.parse(history.location.search);

    closeRoute.searchParamToDelete && delete searchParams[closeRoute.searchParamToDelete];
    return `?${queryString.stringify(searchParams)}`;
  };

  const getNotFoundSearchText = () => {
    const searchParams = queryString.parse(history.location.search);

    if (notFoundRoute?.searchParamToAdd) {
      searchParams[notFoundRoute?.searchParamToAdd] = searchText;
    }
    return queryString.stringify(searchParams);
  };

  useIonViewWillEnter(() => {
    setSearchText((queryString.parse(history.location.search)[SearchParams.NewItemName] as string) || "");
  });

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle slot={"start"}>{title}</IonTitle>
          <IonButtons slot={"end"}>
            <CloseButton history={history} pathname={closeRoute.pathname} searchParamToDelete={closeRoute.searchParamToDelete} />
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar onIonChange={(event) => setSearchText(event.detail.value ? event.detail.value : "")} value={searchText} />
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
  );
};
