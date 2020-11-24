import { breweryReducer } from "./Breweries/Reducers";
import { beerReducer } from "./Beer/Reducers";
import { styleReducer } from "./Styles/Reducers";
import { domainReducer } from "./Domain/Reducers";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  breweries: breweryReducer,
  beer: beerReducer,
  style: styleReducer,
  domain: domainReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
