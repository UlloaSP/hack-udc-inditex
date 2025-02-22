import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-sm">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="./assets/itx.png"
            className="navbar-logo me-2"
            alt="HackUDC - Inditex logo"
            height="100"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
