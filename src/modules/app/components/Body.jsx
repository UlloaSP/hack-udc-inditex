import { Route, Routes } from "react-router-dom";

import SearchResult from "./../../products/components/SearchResults.jsx";
import Home from "./Home";

const Body = () => {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/result" element={<SearchResult />} />
      </Routes>
    </div>
  );
};

export default Body;
