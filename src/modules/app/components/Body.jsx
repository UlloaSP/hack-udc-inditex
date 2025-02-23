import { Route, Routes } from "react-router-dom";

import SearchResults from "./../../products/components/SearchResults.jsx";
import Home from "./Home.jsx";

const Body = () => {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/result" element={<SearchResults />} />
      </Routes>
    </div>
  );
};

export default Body;
