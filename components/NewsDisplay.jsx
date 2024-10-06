"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import "./styles/NewsDisplay.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

const NewsDisplay = ({ leagueName }) => {
	const [news, setNews] = useState([]);
	const [error, setError] = useState(null);

	gsap.registerPlugin(ScrollTrigger);

	useGSAP(() => {
		gsap.to(".club-item", {
			delay: 2.5,
			opacity: 1,
			duration: 2,
			stagger: {
				each: 0.15,
				grid: "auto",
				from: "start",
			},
		});
	}, []);

	useEffect(() => {
		if (news.length > 0) {
			gsap.to(".homepage-news-item", {
				scrollTrigger: {
					trigger: ".homepage-news-item",
					start: "top 60%",
					toggleActions: "play none none none",
				},
				opacity: 1,
				stagger: {
					each: 0.25,
				},
			});
		}
	}, [news]);

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response = await axios.get(`https://newsapi.org/v2/everything`, {
					params: {
						q: `${leagueName} football Soccer NOT cricket NOT NFL NOT NBA NOT MLB`,
						language: "en",
						sortBy: "publishedAt",
						pageSize: 10,
						apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
					},
				});
				setNews(response.data.articles);
			} catch (error) {
				console.error("Error fetching news:", error);
				setError("Error loading news. Please try again.");
			}
		};

		fetchNews();
	}, [leagueName]);

	return (
		<>
			{/* News section */}
			<div className="news-header">
				<h2>Explore recent news in the {leagueName}</h2>
			</div>

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
		</>
	);
};

export default NewsDisplay;
