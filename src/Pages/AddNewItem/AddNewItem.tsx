import React from "react";
import { routes } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { SearchParams } from "../../Utils/Constants";

export interface IAddNewItemModal {}

export const AddNewItem: React.FC<IAddNewItemModal> = (props) => {
  const [beers, setBeers] = React.useState<string[]>([]);
  const { inventoryRoute, createNewItemRoute } = routes;

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
      // {...props}
    />
  );
};
