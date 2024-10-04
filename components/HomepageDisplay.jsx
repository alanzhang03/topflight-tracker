"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/HomepageDisplay.scss";
import Link from "next/link";

const HomepageDisplay = ({ leagueName, logo, description, routeLinks }) => {
	const [news, setNews] = useState([]);

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response = await axios.get(`https://newsapi.org/v2/everything`, {
					params: {
						q: `${leagueName} football`,
						language: "en",
						sortBy: "publishedAt",
						pageSize: 10,
						apiKey: "d2a28653bc8b4ef6b7d988eceb9155ea",
					},
				});
				setNews(response.data.articles);
			} catch (error) {
				console.error("Error fetching news:", error);
			}
		};

		fetchNews();
	}, [leagueName]);

	return (
		<div className="homepage-container">
			<div className="homepage-hero-section">
				<div className="homepage-hero-content">
					<img src={logo} alt={`${leagueName} logo`} className="league-logo" />
					<h1 className="homepage-header">Welcome to {leagueName} Page</h1>
					<p className="homepage-paragraph">{description}</p>
				</div>
				{/* league nav */}
				<nav className="league-nav">
					{routeLinks.map((link, index) => (
						<Link key={index} href={link.path} className="nav-link">
							{link.name}
						</Link>
					))}
				</nav>
			</div>

			{/* News section */}
			<div className="news-container">
				{news.length === 0 ? (
					<p>Loading...</p>
				) : (
					news.map((article, index) => (
						<Link
							key={index}
							href={article.url}
							target="_blank"
							rel="noopener noreferrer"
							className="news-item-link"
						>
							<div className="homepage-news-item">
								<img
									src={article.urlToImage || "/images/hero.jpg"}
									alt={article.title}
									className="news-item-image"
								/>
								<h3>{article.title}</h3>
								<p>{article.description}</p>
								<p>{new Date(article.publishedAt).toLocaleDateString()}</p>
							</div>
						</Link>
					))
				)}
			</div>
		</div>
	);
};

export default HomepageDisplay;
