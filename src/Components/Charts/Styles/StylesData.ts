import { BeerDocument, StyleDocument, StyleData, BreweryDocument } from "../../../Interfaces";
import * as _ from "lodash";

const shortenName = (name: string) => {
  if (name.length > 12) {
    return `${name.slice(0, 12)}...`;
  }
  return name;
};

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

export const getStylesByBreweryData = (styleId: string, beer: BeerDocument[]) => {
  console.log(styleId);
  beer.forEach((_beer) => _beer.style._id);
  console.log(beer.filter((_beer) => _beer.style._id === styleId));
  // Create an interface that has a unique ID so we can properly search...see below
  let tmpData: (StyleData & { _id: string })[] = [];

  // Get all beers with given style ID as a list
  beer
    .filter((_beer) => _beer.style._id === styleId)
    .forEach((item) => {
      // See if the brewery has been added yet (via ID)
      const dataIdx = tmpData.findIndex((_data) => _data._id === item.brewery._id);
      if (dataIdx < 0) {
        tmpData.push({
          _id: item.brewery._id,
          name: item.brewery.name,
          value: item.historicQuantity,
        });
      } else {
        tmpData[dataIdx].value += item.historicQuantity;
      }
    });

  const data: StyleData[] = tmpData.map((_data) => ({ name: shortenName(_data.name), value: _data.value }));
  return data;
};
