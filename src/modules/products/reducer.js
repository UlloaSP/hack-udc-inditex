import { combineReducers } from "redux";

import * as actionTypes from "./actionTypes";

const initialState = {
  productSearch: null,
};

const productSearch = (state = initialState.productSearch, action) => {
  if (action.type === actionTypes.FIND_PRODUCTS_COMPLETED) {
    return action.productSearch;
  } else if (action.type === actionTypes.CLEAR_PRODUCTS_SEARCH) {
    return initialState.productSearch;
  } else {
    return state;
  }
};

const reducer = combineReducers({
  productSearch,
});

export default reducer;
