import { createStore } from "redux";
import { rootReducer } from "./Store/index";

const store = createStore(rootReducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

export { store };
