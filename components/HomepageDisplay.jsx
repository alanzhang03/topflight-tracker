import React from "react";
import PropTypes from "prop-types";
import "./styles/HomepageDisplay.scss";

const HomepageDisplay = ({ leagueName, logo, description, routeLinks }) => {
  return (
    <div className="homepage-container">
      <div className="hero-section">
        <div className="hero-content">
          <img src={logo} alt={`${leagueName} logo`} className="league-logo" />
          <h1>Welcome to {leagueName} Page</h1>
          <p>{description}</p>
        </div>
      </div>

      <nav className="league-nav">
        {routeLinks.map((link, index) => (
          <a key={index} href={link.path} className="nav-link">
            {link.name}
          </a>
        ))}
      </nav>
    </div>
  );
};

HomepageDisplay.propTypes = {
  leagueName: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  routeLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HomepageDisplay;
