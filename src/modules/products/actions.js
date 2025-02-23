import backend from "../../backend";
import * as actionTypes from "./actionTypes";

const findProductsCompleted = (productsSearch) => ({
  type: actionTypes.FIND_PRODUCTS_COMPLETED,
  productsSearch,
});

export const findProducts = (criteria) => (dispatch) => {
  backend.findProducts(criteria, (result) =>
    dispatch(findProductsCompleted({ criteria, result }))
  );
};
