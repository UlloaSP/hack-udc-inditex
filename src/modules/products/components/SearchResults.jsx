import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as selectors from "../selectors";

const FindproductsResult = () => {
  const productSearch = useSelector(selectors.getproductsSearch);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!productSearch) {
    return null;
  }

  if (productSearch.result.items.length === 0) {
    return (
      <div className="alert alert-danger" role="alert">
        <FormattedMessage id="project.products.FindproductsResult.noproductsFound" />
      </div>
    );
  }

  return <div className="row d-flex justify-content-center"></div>;
};

export default FindproductsResult;
