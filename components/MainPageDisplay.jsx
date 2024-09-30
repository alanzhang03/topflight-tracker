"use client";

import React from "react";
import "./styles/MainPageDisplay.scss";

const MainPageDisplay = () => {
	const handleGetStartedClick = () => {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: "smooth",
		});
	};

	return (
		<div className="main-page-container">
			{/* Hero Section */}
			<div className="hero-section">
				<div className="hero-content">
					<h1>Welcome to the TopFlight Tracker</h1>
					<p>
						Explore detailed standings, match history, lineups, and more from
						the Premier League, La Liga, Bundesliga, and Champions League.
					</p>
					<button className="cta-button" onClick={handleGetStartedClick}>
						Get Started
					</button>
				</div>
			</div>

			{/* About Section */}
			<section className="about-section">
				<h2>About TopFlight Tracker</h2>
				<p>
					TopFlight Tracker is your go-to destination for real-time updates on
					football leagues, including standings, fixtures, and team lineups.
					Stay up-to-date with every match and follow your favorite teams
					through our intuitive and user-friendly platform.
				</p>
			</section>

			{/* Featured Leagues Section */}
			<section className="leagues-section">
				<h2>Explore the Top Leagues</h2>
				<div className="leagues-container">
					<div className="league-card">
						<img src="/images/premier-league.svg" alt="Premier League" />
					</div>
					<div className="league-card">
						<img src="/images/bundesliga.svg" alt="Bundesliga" />
					</div>
					<div className="league-card">
						<img src="/images/la-liga.svg" alt="La Liga" />
					</div>
					<div className="league-card">
						<img src="/images/champions-league.svg" alt="Champions League" />
					</div>
				</div>
			</section>

			{/* Call to Action Section */}
			<section className="cta-section">
				<h2>Start Tracking Now</h2>
				<p>
					Discover match fixtures, team lineups, and standings in real-time.
					Click the button below to start exploring your favorite football
					leagues.
				</p>
				<button
					className="cta-button-secondary"
					onClick={handleGetStartedClick}
				>
					Track Matches
				</button>
			</section>

			{/* Recent News Section */}
			<section className="news-section">
				<h2>Latest Updates</h2>
				<div className="news-container">
					<div className="news-item">
						<h3>Premier League Matchday Recap</h3>
						<p>
							Catch up on the latest action from Matchday 7 in the Premier
							League...
						</p>
						<a href="#">Read More</a>
					</div>
					<div className="news-item">
						<h3>Bundesliga Fixtures Announced</h3>
						<p>
							The upcoming fixtures for Bundesliga have been released. Check out
							the schedule!
						</p>
						<a href="#">See Fixtures</a>
					</div>
					<div className="news-item">
						<h3>Champions League Highlights</h3>
						<p>
							Relive the best moments from this week’s Champions League
							matches...
						</p>
						<a href="#">Watch Now</a>
					</div>
				</div>
			</section>


		</div>
	);
};

export default MainPageDisplay;
