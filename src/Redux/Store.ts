import { createStore } from "redux";
import { rootReducer } from "./Store/index";
import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const composeEnhancers =
  (process.env.REACT_APP_IS_PROD === "false" &&
    typeof window !== "undefined" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })) ||
  compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export { store };
