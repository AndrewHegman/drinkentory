import React from "react";
import { IonContent, IonToolbar, IonTitle, IonButtons, IonHeader, IonSearchbar, IonList, IonPage } from "@ionic/react";
import { useBasePageWithSearchBarStyles } from "./BasePageWithSearchBar.styles";
import { IonItemLink } from "../IonItemLink/IonItemLink";
import { BasePageHeader } from "../BasePageHeader";

// TODO: Add a selectRoute interface as well
export interface IBasePageWithSearchBarProps {
  title: string;
  items: string[];
  initialSearchText?: string;
  onClick?: (searchText: string) => void;
  pathname: string;
  notFoundRoute?: {
    pathname: string;
    searchParamToAdd?: string;
  };
}

export const BasePageWithSearchBar: React.FC<IBasePageWithSearchBarProps> = (props) => {
  const { pathname, notFoundRoute, title, items } = props;

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
          {items.map((item) => (
            <div>{item}</div>
          ))}
          {showNotFound && (
            <IonItemLink
              to={{ pathname: notFoundRoute?.pathname }}
              onClick={() => {
                props.onClick && props.onClick(searchText);
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
