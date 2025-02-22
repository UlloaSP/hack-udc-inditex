const getModuleState = (state) => state.products;

export const getProductsSearch = (state) =>
  getModuleState(state).productsSearch;
