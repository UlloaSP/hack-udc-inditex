import PropTypes from "prop-types";

const SearchBar = ({ placeholder, value, onChange, onSubmit }) => {
  return (
    <form
      className="form-row mt-2 d-flex flex-column flex-md-row align-items-center justify-content-center"
      onSubmit={onSubmit}
    >
      <div className="form-group mb-2 mb-md-0 me-md-2">
        <input
          id="searchInput"
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>

      <button
        id="searchSubmit"
        type="submit"
        className="btn btn-primary mt-2 mt-md-0"
      >
        Search
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  placeholder: "Search products...",
};

export default SearchBar;
