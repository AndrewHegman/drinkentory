import { BeerDocument, StyleDocument, StyleData, BreweryDocument } from "../../../Interfaces";
import * as _ from "lodash";

export const getStylesByBeerData = (styles: StyleDocument[], beer: BeerDocument[]) => {
  // https://24ways.org/2019/five-interesting-ways-to-use-array-reduce/
  const totalQuantity = beer.reduce((a, b) => a + b.historicQuantity, 0);
  let otherQuantity = 0;
  let data: StyleData[];

  data = styles
    .map((style) => {
      // Calculate sum of each style of beer
      let value = beer.filter((beer) => beer.style._id === style._id).reduce((a, b) => a + b.historicQuantity, 0);

      if (value / totalQuantity < 0.1) {
        otherQuantity += value;
        value = 0;
      }
      return {
        name: style.name,
        value,
      };
    })
    .filter((datum) => datum.value > 0);
  data.push({
    name: "Other",
    value: otherQuantity,
  });

  return data;
};

//5fee0c0fef79624794d973cc
export const getStylesByBreweryData = (styleId: string, beer: BeerDocument[]) => {
  let data: StyleData[] = [];

  beer.filter((_beer) => _beer.style._id === styleId).forEach((selectedBeer) => console.log(selectedBeer));

  // Get all unique styles
  // _.uniqBy(beer, "style._id").forEach((item) => {
  //   // Count breweries based on style
  //   console.log(item.style.name);
  //   beer
  //     .filter((_beer) => _beer.style._id === item.style._id)
  //     .forEach((styleItem) => {
  //       console.log(`\t${styleItem.brewery.name}`);
  //     });
  // });

  return data;
};
