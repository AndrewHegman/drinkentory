import React from "react";
import { IonContent, IonToolbar, IonHeader, IonSearchbar, IonList, IonPage } from "@ionic/react";
import { useBasePageWithSearchBarStyles } from "./BasePageWithSearchBar.styles";
import { ClickableIonItem } from "../ClickableIonItem/ClickableIonItem";
import { BasePageHeader } from "../BasePageHeader";
import { Never } from "../../Utils";

type BaseProps = {
  title: string;
  onClosePathname: string;

  onSearchTextChange?: (searchText: string) => void;
  onClose?: () => void;
};

type NotFoundLinkProps = {
  onNotFoundClick?: (searchText: string) => void;
  showNotFound: boolean;
  notFoundRoute: {
    pathname: string;
    search?: string;
  };
  notFoundRouteDirection?: "root" | "none" | "forward" | "back";
};

export type BasePageWithSearchBarProps = BaseProps & (NotFoundLinkProps | Never<NotFoundLinkProps>);

export const BasePageWithSearchBar: React.FC<BasePageWithSearchBarProps> = (props) => {
  const { onClosePathname, notFoundRoute, title, showNotFound, onClose, onSearchTextChange, notFoundRouteDirection } = props;
  const [searchText, setSearchText] = React.useState<string>("");

  const classes = useBasePageWithSearchBarStyles();

  React.useEffect(() => {
    onSearchTextChange && onSearchTextChange(searchText);
  }, [searchText]);

  const onCloseButtonClick = () => {
    setSearchText("");
    onClose && onClose();
  };
  return (
    <IonPage>
      <IonHeader translucent>
        <BasePageHeader title={title} onClosePathname={onClosePathname} onClose={onCloseButtonClick} />
        <IonToolbar>
          <IonSearchbar onIonChange={(event) => setSearchText(event.detail.value ? event.detail.value : "")} debounce={350} />
        </IonToolbar>
      </IonHeader>
      <IonContent className={classes.root}>
        <IonList>
          {props.children}

          {showNotFound && (
            <ClickableIonItem
              pathname={notFoundRoute!.pathname}
              search={notFoundRoute?.search}
              routerDirection={notFoundRouteDirection}
              onClick={() => {
                props.onNotFoundClick && props.onNotFoundClick(searchText);
                return true;
              }}
            >
              Add&nbsp;<b>{searchText}?</b>
            </ClickableIonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
