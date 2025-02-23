import * as actions from "./actions";
import * as actionTypes from "./actionTypes";
import reducer from "./reducer";
import * as selectors from "./selectors";

export { default as SearchBar } from "../products/components/SearchBar";
export { default as SearchResults } from "../products/components/SearchResults";

export default { actions, actionTypes, reducer, selectors };
