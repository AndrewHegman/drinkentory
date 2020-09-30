import React from "react";
import { IonContent, IonToolbar, IonTitle, IonButtons, IonHeader, IonSearchbar, IonList, IonPage } from "@ionic/react";
import { useBasePageWithSearchBarStyles } from "./BasePageWithSearchBar.styles";
import { IonItemLink } from "../IonItemLink/IonItemLink";
import { CloseButton } from "../CloseButton/CloseButton";

// TODO: Add a selectRoute interface as well
export interface IAddNewItemModal {
  title: string;
  items: string[];
  // action?: BreweryActionCallbacks;
  initialSearchText?: string;
  parent?: string;
  onClick?: (searchText: string) => void;
  closeRoute: {
    pathname: string;
    searchParamToDelete?: string;
  };
  notFoundRoute?: {
    pathname: string;
    searchParamToAdd?: string;
  };
}

// let initialSearchText: string;

export const BasePageWithSearchBar: React.FC<IAddNewItemModal> = (props) => {
  const { closeRoute, notFoundRoute, title, items, initialSearchText } = props;

  const [searchText, setSearchText] = React.useState<string>("");
  const [showNotFound, setShowNotFound] = React.useState<boolean>(false);
  // const dispatch = useDispatch();
  const classes = useBasePageWithSearchBarStyles();

  // console.log(props.parent, initialSearchText);
  // initialSearchText = useSelector(selector || ((state: RootState) => state.breweries.name));

  React.useEffect(() => {
    if (searchText !== "") {
      notFoundRoute && setShowNotFound(true);
    } else {
      setShowNotFound(false);
    }
  }, [searchText, notFoundRoute]);

  React.useEffect(() => {
    console.log("searchText: ", props.initialSearchText);
    setSearchText(props.initialSearchText || "");
  }, [props.initialSearchText]);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle slot={"start"}>{title}</IonTitle>
          <IonButtons slot={"end"}>
            <CloseButton pathname={closeRoute.pathname} searchParamToDelete={closeRoute.searchParamToDelete} />
          </IonButtons>
        </IonToolbar>
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
