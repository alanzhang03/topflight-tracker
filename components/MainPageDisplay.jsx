import React from "react";
import "./styles/MainPageDisplay.scss";

const MainPageDisplay = () => {
	return (
		<div className="main-page-container">
			<div className="hero-section">
				<div className="hero-content">
					<h1>Welcome to the TopFlight Tracker</h1>
					<p>
						Explore detailed standings, match history, lineups, and more from
						the Premier League, La Liga, Bundesliga, and Champions League.
					</p>
					<button className="cta-button">Get Started</button>
				</div>
			</div>
		</div>
	);
};

export default MainPageDisplay;
