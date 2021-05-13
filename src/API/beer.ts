import { get, post, put } from "./common";
import { store } from "../Redux/Store";
import { NewBeer } from "../Interfaces";

export const Beer = {
  fetchAllBeer: async () => {
    const state = store.getState();
    const result = await get(`${state.common.serverAddress}/v2/beer/current`, state.users.token);

    if (result.ok) {
      return result.json();
    } else {
      return Promise.reject(result.text);
    }
  },

  addNewBeer: async (newBeer: NewBeer) => {
    const state = store.getState();
    const result = await post(
      `${state.common.serverAddress}/v2/beer`,
      JSON.stringify({
        name: newBeer.name,
        brewery: newBeer.brewery._id,
        style: newBeer.style._id,
        container: newBeer.container,
        quantity: newBeer.quantity,
        historicQuantity: newBeer.quantity,
      }),
      state.users.token
    );

    if (result.ok) {
      return result.json();
    } else {
      return Promise.reject(result.text);
    }
  },

  fetchBeerById: async (id: string) => {
    const state = store.getState();
    const result = await get(`${state.common.serverAddress}/v2/beer/${id}?expand=brewery,style`, state.users.token);

    if (result.ok) {
      return result.json();
    } else {
      return Promise.reject(result.text);
    }
  },

  incrementBeerQuantity: async (id: string) => {
    const state = store.getState();

    const result = await put(`${state.common.serverAddress}/v2/beer/increment/${id}`, "", state.users.token);
    // THIS IS A BREAKING CHANGE -- this should be fixed for the increment route--check the redux actions
    if (result.ok) {
      return result.json();
    } else {
      return Promise.reject(result.text);
    }
  },

  decrementBeerQuantity: async (id: string) => {
    const state = store.getState();

    const result = await put(`${state.common.serverAddress}/v2/beer/decrement/${id}`, "", state.users.token);
    // THIS IS A BREAKING CHANGE
    if (result.ok) {
      return result.json();
    } else {
      return Promise.reject(result.text);
    }
  },

  updateBeerQuantity: async (id: string, quantity: number) => {
    const state = store.getState();

    const result = await put(`${state.common.serverAddress}/v2/beer/${id}`, JSON.stringify({ quantity }), state.users.token);
    // THIS IS A BREAKING CHANGE
    if (result.ok) {
      return result.json();
    } else {
      return Promise.reject(result.text);
    }
  },
} as const;
