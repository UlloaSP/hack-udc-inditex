import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UploadButton } from "../../common";
import { SearchBar } from "../../products";
import { findProducts } from "./../../products/actions";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (searchQuery.trim() === "") return;

    const timeoutId = setTimeout(() => {
      dispatch(findProducts({ query: searchQuery }));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, dispatch]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    dispatch(findProducts({ query: searchQuery }));
  };

  return (
    <div className="home assign-section">
      <video
        id="tutorial-video"
        autoPlay
        muted
        loop
        className="video-background v"
      >
        <source src="/assets/media/video/gift-ropa.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay">
        <SearchBar
          placeholder="Search something..."
          value={searchQuery}
          onChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
        />
        <div className="separator"></div>
        <UploadButton />
      </div>
    </div>
  );
};

export default Home;
