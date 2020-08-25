import React from "react";
import { createNewBreweryRoute } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";

export interface IAddNewItemModal {}

export const SetStyle: React.FC<IAddNewItemModal> = (props) => {
  const [styles, setStyles] = React.useState<string[]>([]);

  // TODO: Make sure that the appropriate route is used based on domain
  return (
    <>
      <BasePageWithSearchBar
        title="Choose a Style"
        items={styles}
        closeRoute={{
          pathname: createNewBreweryRoute.to,
        }}
      />
    </>
  );
};
