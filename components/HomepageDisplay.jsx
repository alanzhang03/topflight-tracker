import React from "react";
import PropTypes from "prop-types";
import "./styles/HomepageDisplay.scss";
import Link from "next/link";

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
					<Link key={index} href={link.path} className="nav-link">
						{link.name}
					</Link>
				))}
			</nav>
		</div>
	);
};

export default HomepageDisplay;
