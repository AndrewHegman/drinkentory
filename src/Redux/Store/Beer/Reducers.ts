import { actionTypes, BeerActionTypes, BeerState } from "./Types";
import { BreweryDocument, NewBeer, StyleDocument, Container, BeerDocument } from "../../../Interfaces";

const initialNewBeerState: NewBeer = {
  name: "",
  brewery: {} as BreweryDocument,
  style: {} as StyleDocument,
  container: Container.Can,
  quantity: 0,
};

export const initialState: BeerState = {
  inventory: [],
  isWaitingOnFetch: false,
  newBeer: initialNewBeerState,
  isWaitingOnBeerUpdate: false,
  isWaitingOnAddNewBeer: false,
  beerBeingEditted: {} as BeerDocument,
};

export const beerReducer = (state = initialState, action: BeerActionTypes): BeerState => {
  switch (action.type) {
    case actionTypes.SET_NEW_BEER_NAME:
      return {
        ...state,
        newBeer: {
          ...state.newBeer,
          name: action.name,
        },
      };

    case actionTypes.SET_NEW_BEER_BREWERY:
      return {
        ...state,
        newBeer: {
          ...state.newBeer,
          brewery: action.brewery,
        },
      };

    case actionTypes.SET_NEW_BEER_STYLE:
      return {
        ...state,
        newBeer: {
          ...state.newBeer,
          style: action.style,
        },
      };

    case actionTypes.SET_NEW_BEER_CONTAINER:
      return {
        ...state,
        newBeer: {
          ...state.newBeer,
          container: action.container,
        },
      };

    case actionTypes.SET_NEW_BEER_QUANTITY:
      return {
        ...state,
        newBeer: {
          ...state.newBeer,
          quantity: action.quantity,
        },
      };

    case actionTypes.WAIT_ON_BEER_FETCH:
      return {
        ...state,
        isWaitingOnFetch: true,
      };

    case actionTypes.FETCH_BY_ID_RECEIVED:
      return {
        ...state,
        isWaitingOnFetch: false,
        inventory: [...state.inventory, action.byId],
      };

    case actionTypes.FETCH_ALL_BEER_RECEIVED:
      return {
        ...state,
        isWaitingOnFetch: false,
        inventory: action.inventory,
      };

    case actionTypes.WAIT_ON_UPDATE_BEER:
      return {
        ...state,
        isWaitingOnBeerUpdate: true,
      };

    case actionTypes.UPDATE_BEER_FINISHED:
      return {
        ...state,
        isWaitingOnBeerUpdate: false,
        inventory: [
          ...state.inventory.map((beer) => {
            if (beer._id !== action.id) {
              return beer;
            }

            return {
              ...beer,
              ...action.beer,
            };
          }),
        ],
      };

    case actionTypes.WAIT_ON_ADD_NEW_BEER:
      return {
        ...state,
        isWaitingOnAddNewBeer: true,
      };

    case actionTypes.ADD_NEW_BEER_FINISHED:
      return {
        ...state,
        isWaitingOnAddNewBeer: false,
        inventory: [...state.inventory, action.newBeer],
      };

    case actionTypes.SET_BEER_BEING_EDITTED:
      return {
        ...state,
        beerBeingEditted: action.beer,
      };

    // case actionTypes.CLEAR_BEER_BEING_EDITTED:
    //   return {
    //     ...state,
    //     beerBeingEditted: null,
    //   };

    default:
      return state;
  }
};
