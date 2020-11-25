import {
  SET_NEW_BEER_ID,
  SET_NEW_BEER_NAME,
  SET_NEW_BEER_BREWERY,
  SET_NEW_BEER_STYLE,
  SET_NEW_BEER_QUANTITY,
  SET_NEW_BEER_HISTORIC_QUANTITY,
  WAIT_ON_BEER_REQUEST,
  UPDATE_BEER_BY_ID,
  FETCH_BY_ID_RECEIVED,
  FETCH_ALL_BEER_RECEIVED,
  BeerActionTypes,
  BeerState,
} from "./Types";
import { Beer } from "../../../Interfaces/Beer.types";

const initialNewBeerState: Beer = {
  _id: "",
  name: "",
  brewery: "",
  style: "",
  quantity: 0,
  historicQuantity: 0,
};

const initialState: BeerState = {
  inventory: [],
  isLoading: false,
};

export const beerReducer = (state = initialState, action: BeerActionTypes): BeerState => {
  switch (action.type) {
    case SET_NEW_BEER_ID:
      return {
        ...state,
        newBeer: {
          ...initialNewBeerState,
          ...state.newBeer,
          _id: action.id,
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

    case WAIT_ON_BEER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_BY_ID_RECEIVED:
      return {
        ...state,
        isLoading: false,
        inventory: [...state.inventory, action.byId],
      };

    case FETCH_ALL_BEER_RECEIVED:
      return {
        ...state,
        isLoading: false,
        inventory: action.inventory,
      };

    case UPDATE_BEER_BY_ID:
      return {
        ...state,
        isLoading: false,
        inventory: [
          ...state.inventory.map((beer) => {
            if (beer._id !== action.id) {
              return beer;
            }

            console.log({
              ...beer,
              ...action.beer,
            });

            return {
              ...beer,
              ...action.beer,
            };
          }),
        ],
      };

    default:
      return state;
  }
};
