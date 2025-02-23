import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      actions.findProducts({
        query: searchTerm,
        brand: "zara",
        page: 1,
        perPage: 20,
      })
    );
    navigate("/products/result");
  };

  return (
    <form className="inditex-searchbar" onSubmit={handleSubmit}>
      <input
        id="searchInput"
        type="text"
        className="inditex-search-input"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
      />
    </form>
  );
};

export default SearchBar;
