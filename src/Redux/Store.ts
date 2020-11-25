import { createStore } from "redux";
import { rootReducer } from "./Store/index";
import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__({ trace: true }))
);

export { store };
