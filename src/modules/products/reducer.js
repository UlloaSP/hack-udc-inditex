import { combineReducers } from "redux";

import * as actionTypes from "./actionTypes";

const initialState = {
  productsSearch: null,
};

const productsSearch = (state = initialState.productsSearch, action) => {
  if (action.type === actionTypes.FIND_PRODUCTS_COMPLETED) {
    return action.productsSearch;
  } else if (action.type === actionTypes.CLEAR_PRODUCTS_SEARCH) {
    return initialState.productsSearch;
  } else {
    return state;
  }
};

const reducer = combineReducers({
  productsSearch,
});

export default reducer;
