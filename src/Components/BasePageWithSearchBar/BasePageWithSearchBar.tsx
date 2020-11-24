import React from "react";
import { IonContent, IonToolbar, IonHeader, IonSearchbar, IonList, IonPage } from "@ionic/react";
import { useBasePageWithSearchBarStyles } from "./BasePageWithSearchBar.styles";
import { IonItemLink } from "../IonItemLink/IonItemLink";
import { BasePageHeader } from "../BasePageHeader";

export interface IBasePageWithSearchBarProps {
  title: string;
  initialSearchText?: string;
  onNotFoundClick?: (searchText: string) => void;
  pathname: string;
  notFoundRoute?: {
    pathname: string;
  };
}

export const BasePageWithSearchBar: React.FC<IBasePageWithSearchBarProps> = (props) => {
  const { pathname, notFoundRoute, title } = props;
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

  React.useEffect(() => {
    setSearchText(props.initialSearchText || "");
  }, [props.initialSearchText]);

  return (
    <IonPage>
      <IonHeader translucent>
        <BasePageHeader title={title} pathname={pathname} />
        <IonToolbar>
          <IonSearchbar onIonChange={(event) => setSearchText(event.detail.value ? event.detail.value : "")} value={searchText} />
        </IonToolbar>
      </IonHeader>
      <IonContent className={classes.root}>
        <IonList>
          {props.children}

          {showNotFound && (
            <IonItemLink
              to={{ pathname: notFoundRoute?.pathname }}
              onClick={() => {
                props.onNotFoundClick && props.onNotFoundClick(searchText);
              }}
            >
              Add&nbsp;<b>{searchText}?</b>
            </IonItemLink>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
