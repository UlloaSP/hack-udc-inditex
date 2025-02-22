import backend from "../../backend";
import * as actionTypes from "./actionTypes";

const findProductsCompleted = (productsSearch) => ({
  type: actionTypes.FIND_PRODUCTS_COMPLETED,
  productsSearch,
});

const clearProductsSearch = () => ({
  type: actionTypes.CLEAR_PRODUCTS_SEARCH,
});

export const findProducts = (criteria) => (dispatch) => {
  dispatch(clearProductsSearch());
  backend.searchProducts(criteria, (result) =>
    dispatch(findProductsCompleted({ criteria, result }))
  );
};

export const previousFindProducts = (criteria) =>
  findProducts({ ...criteria, page: criteria.page - 1 });

export const nextFindProducts = (criteria) =>
  findProducts({ ...criteria, page: criteria.page + 1 });
