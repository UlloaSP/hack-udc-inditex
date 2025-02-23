import React from "react";
import UploadButton from "./../../common/components/UploadButton";
import SearchBar from "./SearchBar";

const SearchResults = () => {
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

export default SearchResults;
