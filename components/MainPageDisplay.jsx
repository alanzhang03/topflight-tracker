"use client";

import React, { useEffect } from "react";
import "./styles/MainPageDisplay.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import ScrollTrigger from "gsap/ScrollTrigger";

const MainPageDisplay = () => {
	const handleGetStartedClick = () => {
		const aboutSection = document.querySelector(".about-section");
		if (aboutSection) {
			aboutSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	const handleStartTrackingClick = () => {
		const leaguesSection = document.querySelector(".leagues-section");
		if (leaguesSection) {
			leaguesSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	gsap.registerPlugin(ScrollTrigger);

	useGSAP(() => {
		gsap.to(".hero-content", {
			delay: 0.25,
			opacity: 1,
			duration: 1,
			scale: 1,
		});

		gsap.to(".about-section h2", {
			scrollTrigger: ".about-section h2",
			delay: 0.25,
			opacity: 1,
			duration: 2,
		});
		gsap.to(".about-section p", {
			scrollTrigger: ".about-section p",
			delay: 0.5,
			opacity: 1,
			duration: 2,
		});
		gsap.to(".leagues-section h2", {
			scrollTrigger: ".leagues-section h2",
			delay: 0.75,
			opacity: 1,
			duration: 2,
		});
		gsap.to(".league-card img", {
			scrollTrigger: ".league-card img",
			delay: 1,
			opacity: 1,
			duration: 1.5,
			stagger: {
				each: 0.2,
				grid: "auto",
				from: "start",
			},
		});

		gsap.to(".cta-section-gsap", {
			scrollTrigger: ".cta-section-gsap",
			delay: 0.5,
			opacity: 1,
			duration: 2,
		});
	}, []);

	return (
		<div className="main-page-container">
			<div className="hero-section">
				<div className="hero-content">
					<h1 className="hero-content-header">
						Welcome to the TopFlight Tracker
					</h1>
					<p className="hero-content-paragraph">
						Explore detailed standings, match history, lineups, and more from
						the Premier League, La Liga, Bundesliga, and Champions League.
					</p>
					<button className="cta-button" onClick={handleGetStartedClick}>
						Get Started
					</button>
				</div>
			</div>

			<section className="about-section">
				<h2>About TopFlight Tracker</h2>
				<p>
					TopFlight Tracker is your go-to destination for real-time updates on
					football leagues, including standings, fixtures, and team lineups.
					Stay up-to-date with every match and follow your favorite teams
					through our intuitive and user-friendly platform.
				</p>
			</section>

			<section className="leagues-section">
				<h2>Explore the Top Leagues</h2>
				<div className="leagues-container">
					<div className="league-card">
						<Link
							href="/leagues/premier-league"
							rel="noopener noreferrer"
							className="news-item-link"
						>
							<img src="/images/premier-league.svg" alt="Premier League" />
						</Link>
					</div>
					<div className="league-card">
						<Link
							href="/leagues/bundesliga"
							rel="noopener noreferrer"
							className="news-item-link"
						>
							<img src="/images/bundesliga.svg" alt="Bundesliga" />
						</Link>
					</div>
					<div className="league-card">
						<Link
							href="/leagues/la-liga"
							rel="noopener noreferrer"
							className="news-item-link"
						>
							<img src="/images/la-liga.svg" alt="La Liga" />
						</Link>
					</div>
					<div className="league-card">
						<Link
							href="/leagues/champions-league"
							rel="noopener noreferrer"
							className="news-item-link"
						>
							<img src="/images/champions-league.svg" alt="Champions League" />
						</Link>
					</div>
				</div>
			</section>
			<section className="cta-section">
				<div className="cta-section-gsap">
					<h2>Start Tracking Your Favorite Leagues and Teams Now</h2>
					<p>
						Discover match fixtures and results, team lineups, and standings in
						real-time for all your favorite leagues and teams. Click the button
						below to start exploring.
					</p>
					<Link href="/favorites/" rel="noopener referrer">
						<button className="cta-button-secondary">Track Matches</button>
					</Link>
				</div>
			</section>
		</div>
	);
};

export default MainPageDisplay;
