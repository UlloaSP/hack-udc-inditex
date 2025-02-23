import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer assign-section">
      <div className="footer-container">
        {/* Sección de 4 columnas */}
        <div className="footer-grid">
          <div className="footer-column">
            <h3>Products</h3>
            <ul>
              <li>
                <a href="#">AI</a>
              </li>
              <li>
                <a href="#">Enterprise</a>
              </li>
              <li>
                <a href="#">Fluid Compute</a>
              </li>
              <li>
                <a href="#">APIs</a>
              </li>
              <li>
                <a href="#">Security</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li>
                <a href="#">Community</a>
              </li>
              <li>
                <a href="#">Docs</a>
              </li>
              <li>
                <a href="#">Guides</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Social</h3>
            <ul>
              <li>
                <a href="#">GitHub</a>
              </li>
              <li>
                <a href="#">LinkedIn</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">YouTube</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Estado del sistema con posición absoluta */}
        <div className="footer-status">
          <span className="status-indicator">●</span> All systems normal
        </div>
      </div>
    </div>
  );
};

export default Footer;
