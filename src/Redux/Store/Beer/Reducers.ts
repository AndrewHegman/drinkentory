import {
  SET_NEW_BEER_ID,
  SET_NEW_BEER_NAME,
  SET_NEW_BEER_BREWERY,
  SET_NEW_BEER_STYLE,
  SET_NEW_BEER_QUANTITY,
  SET_NEW_BEER_HISTORIC_QUANTITY,
  FETCH_ALL_BEER,
  BeerActionTypes,
  BeerState,
  Beer,
} from "./Types";

const initialNewBeerState: Beer = {
  id: "",
  name: "",
  brewery: "",
  style: "",
  quantity: 0,
  historicQuantity: 0,
};

const initialState: BeerState = {
  inventory: [],
};

export const beerReducer = (state = initialState, action: BeerActionTypes): BeerState => {
  switch (action.type) {
    case SET_NEW_BEER_ID:
      return {
        ...state,
        newBeer: {
          ...initialNewBeerState,
          ...state.newBeer,
          id: action.id,
        },
      };
    case SET_NEW_BEER_NAME:
      return {
        ...state,
        newBeer: {
          ...initialNewBeerState,
          ...state.newBeer,
          name: action.name,
        },
      };
    case SET_NEW_BEER_BREWERY:
      return {
        ...state,
        newBeer: {
          ...initialNewBeerState,
          ...state.newBeer,
          brewery: action.brewery,
        },
      };
    case SET_NEW_BEER_STYLE:
      return {
        ...state,
        newBeer: {
          ...initialNewBeerState,
          ...state.newBeer,
          style: action.style,
        },
      };
    case SET_NEW_BEER_QUANTITY:
      return {
        ...state,
        newBeer: {
          ...initialNewBeerState,
          ...state.newBeer,
          quantity: action.quantity,
        },
      };
    case SET_NEW_BEER_HISTORIC_QUANTITY:
      return {
        ...state,
        newBeer: {
          ...initialNewBeerState,
          ...state.newBeer,
          historicQuantity: action.historicQuantity,
        },
      };
    case FETCH_ALL_BEER:
      return {
        ...state,
        inventory: action.inventory,
      };
    default:
      return state;
  }
};
