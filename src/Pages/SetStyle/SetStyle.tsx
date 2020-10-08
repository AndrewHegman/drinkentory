import React from "react";
import { routes } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { RouteComponentProps } from "react-router";

export interface IAddNewItemModal extends RouteComponentProps {}

export const SetStyle: React.FC<IAddNewItemModal> = (props) => {
  const [styles, setStyles] = React.useState<string[]>([]);
  const { createNewBreweryRoute } = routes;

  // TODO: Make sure that the appropriate route is used based on domain
  return (
    <>
      <BasePageWithSearchBar
        title="Choose a Style"
        items={styles}
        pathname={createNewBreweryRoute.pathname}
        // {...props}
      />
    </>
  );
};
