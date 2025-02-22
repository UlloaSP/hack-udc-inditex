import { combineReducers } from "redux";

const initialState = {
  product: null,
};

const product = (state = initialState.product, action) => {
  return state;
};

const reducer = combineReducers({
  product,
});

export default reducer;
