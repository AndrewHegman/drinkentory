import React from "react";
import { inventoryRoute, createNewItemRoute } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { SearchParams } from "../../Utils/Constants";
import { RouteComponentProps } from "react-router";

export interface IAddNewItemModal extends RouteComponentProps {}

export const AddNewItem: React.FC<IAddNewItemModal> = (props) => {
  const [beers, setBeers] = React.useState<string[]>([]);

  return (
    <BasePageWithSearchBar
      title="Choose a Beer"
      items={beers}
      closeRoute={{
        pathname: inventoryRoute.pathname,
        searchParamToDelete: SearchParams.NewItemName,
      }}
      notFoundRoute={{
        pathname: createNewItemRoute.pathname,
        searchParamToAdd: SearchParams.NewItemName,
      }}
      {...props}
    />
  );
};
