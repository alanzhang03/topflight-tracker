"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/MainPageDisplay.scss";

const MainPageDisplay = () => {
	const [news, setNews] = useState([]);

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response = await axios.get(`https://newsapi.org/v2/everything`, {
					params: {
						q: "Premier League OR Bundesliga OR La Liga OR Champions League NOT cricket NOT NFL NOT NBA",
						language: "en",
						sortBy: "publishedAt",
						pageSize: 10,
						apiKey: "d2a28653bc8b4ef6b7d988eceb9155ea",
					},
				});
				setNews(response.data.articles);
			} catch (error) {
				console.error("Error fetching news data:", error);
			}
		};

		fetchNews();
	}, []);

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

			{/* Recent News Section */}
			<section className="news-section">
				<h2>Latest News & Stories</h2>
				<div className="news-container">
					{news.length === 0 ? (
						<p>Loading...</p>
					) : (
						news.map((article, index) => (
							<div key={index} className="news-item">
								<img src={article.urlToImage} alt={article.title} />
								<h3>{article.title}</h3>
								<p>{article.description}</p>
								<p>{new Date(article.publishedAt).toLocaleDateString()}</p>
								<a href={article.url} target="_blank" rel="noopener noreferrer">
									Read More
								</a>
							</div>
						))
					)}
				</div>
			</section>
		</div>
	);
};

export default MainPageDisplay;
