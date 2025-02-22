import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import Carousel from "./../../common/components/Carousel";

const Header = () => {
  return (
    <div className="assign-section">
      <Carousel folderPath="/assets/media/img/slides" imageCount={3}>
        <h1
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "4rem",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
          }}
        >
          HACK
        </h1>
      </Carousel>
    </div>
  );
};

export default Header;
