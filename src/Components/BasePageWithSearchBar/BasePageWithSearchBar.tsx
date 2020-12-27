import React from "react";
import { IonContent, IonToolbar, IonHeader, IonSearchbar, IonList, IonPage, IonButton } from "@ionic/react";
import { useBasePageWithSearchBarStyles } from "./BasePageWithSearchBar.styles";
import { IonItemLink } from "../IonItemLink/IonItemLink";
import { BasePageHeader } from "../BasePageHeader";

export interface IBasePageWithSearchBarProps {
  title: string;
  onClosePathname: string;

  initialSearchText?: string;
  onSearchTextChange?: (searchText: string) => void;
  onClose?: () => void;
  onNotFoundClick?: (searchText: string) => void;

  notFoundRoute?: {
    pathname: string;
    search?: string;
  };
}

export const BasePageWithSearchBar: React.FC<IBasePageWithSearchBarProps> = (props) => {
  const { onClosePathname, notFoundRoute, title, onSearchTextChange, onClose } = props;
  const [searchText, setSearchText] = React.useState<string>("");

  const [showNotFound, setShowNotFound] = React.useState<boolean>(false);

  const classes = useBasePageWithSearchBarStyles();

  // React.useEffect(() => {
  //   if(props.showSubmit && !props.onSubmitClick) {
  //     console.warn('If "showSubmit" prop is "true", the "onSubmitClick" callback must defined')
  //   }
  // }, [props.showSubmit])

  React.useEffect(() => {
    onSearchTextChange && onSearchTextChange(searchText);
    if (searchText !== "") {
      notFoundRoute && setShowNotFound(true);
    } else {
      setShowNotFound(false);
    }
  }, [searchText, notFoundRoute]);

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
            <IonItemLink
              pathname={notFoundRoute!.pathname}
              search={notFoundRoute?.search}
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
