import { createStore, applyMiddleware  } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import reducer from "./favoritePlaces";

const store = createStore(reducer, devToolsEnhancer({ trace: true }));
export default store;


