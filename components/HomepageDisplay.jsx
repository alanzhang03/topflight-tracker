"use client";

import React from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./styles/HomepageDisplay.scss";

const HomepageDisplay = ({
	leagueName,
	leagueCode,
	logo,
	description,
	routeLinks,
}) => {
	gsap.registerPlugin(ScrollTrigger);

	useGSAP(() => {
		gsap.to(".nav-link", {
			delay: 1.25,
			opacity: 1,
			duration: 2,
			stagger: {
				each: 0.2,
				grid: "auto",
				from: "start",
			},
		});
		gsap.from(".league-logo", {
			y: -200,
			opacity: 0,
			duration: 1,
		});
		gsap.from(".homepage-header", {
			delay: 0.5,
			y: -200,
			opacity: 0,
			duration: 1,
		});
		gsap.from(".homepage-paragraph", {
			delay: 1,
			opacity: 0,
			duration: 1,
		});
	}, []);

	return (
		<div className="homepage-container">
			<div className="homepage-hero-section">
				<div className="homepage-hero-content">
					<img src={logo} alt={`${leagueName} logo`} className="league-logo" />
					<h1 className="homepage-header">Welcome to {leagueName} Page</h1>
					<p className="homepage-paragraph">{description}</p>
				</div>
				<nav className="league-nav">
					{routeLinks.map((link, index) => (
						<Link key={index} href={link.path} className="nav-link">
							{link.name}
						</Link>
					))}
				</nav>
			</div>
		</div>
	);
};

export default HomepageDisplay;
