import { Route, Routes } from "react-router-dom";

import Home from "./Home";

const Body = () => {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default Body;
