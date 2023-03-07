
 import {
  legacy_createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { prodReducer } from "./products/ProdReducer";
import AdminReducer from "./Admin/AdminReducer"; 
import CartReducer from "./Cart/CartReducer";
import AuthReducer from "./Auth/Auth.reducer";

const rootReducer = combineReducers({
  prodManager: prodReducer,
  admin:AdminReducer,
  cart:CartReducer,
  auth:AuthReducer
});


const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  rootReducer,
  composer(applyMiddleware(thunk))
);
