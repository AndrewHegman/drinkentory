import { BeerDocument, StyleDocument, StyleData, BreweryDocument, HistoryDocument } from "../../../Interfaces";
import * as _ from "lodash";
import { selectors } from "../../../Redux";
import { S_IFREG } from "constants";
import * as d3 from "d3";
import { nest } from "d3-collection";
const monthMap = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
  beer.forEach((_beer) => _beer.style._id);
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

  const data: StyleData[] = tmpData.map((_data) => ({ name: _data.name, value: _data.value })).sort((a, b) => b.value - a.value);
  return data;
};

export const getStylesByDate = (historyData: HistoryDocument[], beer: BeerDocument[], year: string, style?: string): StyleData[] => {
  if (!style) {
    return getFavoriteStylesByDate(historyData, beer, year);
  }
  return (historyData.map((data) => monthMap[new Date(data.date).getMonth()]) as any) as StyleData[];
};

export const getFavoriteStylesByDate = (historyData: HistoryDocument[], beer: BeerDocument[], year: string): StyleData[] => {
  const monthBuckets: { [key: string]: number }[] = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  historyData.forEach((data) => {
    const tmp = { ...beer.find((beer) => beer._id === data.beerId)?.style!, changeAmt: data.changeAmt, month: new Date(data.date).getMonth() };

    if (tmp._id) {
      if (!monthBuckets[tmp.month][tmp._id]) {
        monthBuckets[tmp.month][tmp._id] = tmp.changeAmt;
      } else {
        monthBuckets[tmp.month][tmp._id] += tmp.changeAmt;
      }
    }
  });
  return monthBuckets.map((month) => {
    const tmp = _.toPairs(month);
    const min = _.minBy(tmp, (t) => t[1]);
    return {
      name: min ? min[0] : "",
      value: min ? min[1] : 0,
    };
  });
};
