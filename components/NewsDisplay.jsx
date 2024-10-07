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
	let requestPending = false;

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
			if (requestPending) return;
			requestPending = true;

			var options = {
				method: "GET",
				url: "https://api.newscatcherapi.com/v2/search",
				params: {
					q: `${leagueName} football Soccer -cricket -NFL -NBA -MLB`,
					lang: "en",
					sort_by: "date",
					page: "1",
					page_size: 5,
				},
				headers: {
					"x-api-key": process.env.NEXT_PUBLIC_NEWSCATCHER_API_KEY,
				},
			};

			try {
				const response = await axios.request(options);
				let articles = response.data.articles || [];
				const uniqueArticles = articles.filter(
					(article, index, self) =>
						index === self.findIndex((t) => t.topic === article.topic)
				);
				setNews(uniqueArticles);
			} catch (error) {
				setError("Error loading news. Please try again.");
			}

			setTimeout(() => {
				requestPending = false;
			}, 1000);
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
				{error && <p>{error}</p>}
				{news.length === 0 ? (
					<p>Loading...</p>
				) : (
					news.map((article, index) =>
						article.link ? (
							<Link
								key={index}
								href={article.link}
								target="_blank"
								rel="noopener noreferrer"
								className="news-item-link"
							>
								<div className="homepage-news-item">
									<img
										src={article.media || "/images/hero.jpg"}
										alt={article.title || "News Image"}
										className="news-item-image"
									/>
									<h3 className="news-title">
										{article.title || "No title available"}
									</h3>
									<p className="news-summary">
										{article.summary || "No description available"}
									</p>
									<p>{new Date(article.published_date).toLocaleDateString()}</p>
								</div>
							</Link>
						) : null
					)
				)}
			</div>
		</>
	);
};

export default NewsDisplay;
