import { combineReducers } from "redux";

import app from "../modules/app";
import products from "../modules/products";

const rootReducer = combineReducers({
  app: app.reducer,
  products: products.reducer,
});

export default rootReducer;
