import React from "react";
import { createNewBreweryRoute, createNewItemRoute } from "../../Utils/Routes";
import { BasePageWithSearchBar } from "../../Components/BasePageWithSearchBar";
import { SearchParams } from "../../Utils/Constants";
import { RouteComponentProps } from "react-router";

export interface ISetBreweryProps extends RouteComponentProps {}

export const SetBrewery: React.FC<ISetBreweryProps> = (props) => {
  const [breweries, setBreweries] = React.useState<string[]>([]);

  return (
    <BasePageWithSearchBar
      title="Choose a Brewery"
      items={breweries}
      closeRoute={{ pathname: createNewItemRoute.to, searchParamToDelete: SearchParams.Brewery }}
      notFoundRoute={{ pathname: createNewBreweryRoute.to, searchParamToAdd: SearchParams.BreweryName }}
      {...props}
    />
  );
};
