import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import * as selectors from "../selectors";

const FindproductsResult = () => {
  const productSearch = useSelector(selectors.getProductsSearch);

  if (!productSearch) {
    return null;
  }

  if (productSearch.result.items.length === 0) {
    return (
      <div className="home assign-section">
        <h1>manolito</h1>
        <div className="alert alert-danger" role="alert">
          <FormattedMessage id="project.products.FindproductsResult.noproductsFound" />
        </div>
      </div>
    );
  }

  return <div className="row d-flex justify-content-center"></div>;
};

export default FindproductsResult;
