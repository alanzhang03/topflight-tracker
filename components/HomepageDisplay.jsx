import React from "react";
import "./styles/HomepageDisplay.scss";
import Link from "next/link";

const HomepageDisplay = ({ leagueName, logo, description, routeLinks }) => {
	return (
		<div className="homepage-container">
			<div className="homepage-hero-section">
				<div className="homepage-hero-content">
					<img src={logo} alt={`${leagueName} logo`} className="league-logo" />
					<h1 className="homepage-header">Welcome to {leagueName} Page</h1>
					<p className="homepage-paragraph">{description}</p>
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
