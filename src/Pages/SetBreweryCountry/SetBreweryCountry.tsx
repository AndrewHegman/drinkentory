import React from "react";
import { createNewBreweryRoute } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { RouteComponentProps } from "react-router";

export interface IAddNewItemModal extends RouteComponentProps {}

export const SetBreweryCountry: React.FC<IAddNewItemModal> = (props) => {
  const [countries, setCountries] = React.useState<string[]>([]);

  return (
    <>
      <BasePageWithSearchBar
        title="Choose a Country"
        items={countries}
        closeRoute={{
          pathname: createNewBreweryRoute.to,
        }}
        {...props}
      />
    </>
  );
};
