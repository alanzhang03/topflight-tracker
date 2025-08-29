"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import "./styles/NewsDisplay.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

const NewsDisplay = ({ news = [], error, leagueName }) => {
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

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <>
      <div className="news-header">
        <h2>Explore recent news in the {leagueName}</h2>
      </div>

      <div className="news-container">
        {news.length === 0 ? (
          <p>Loading...</p>
        ) : (
          news.map((article, index) => (
            <div key={index} className="homepage-news-item">
              {article.media && (
                <img
                  src={article.media}
                  alt={article.title || "News Image"}
                  className="news-item-image"
                />
              )}
              <h3 className="news-title">
                {article.title || "No title available"}
              </h3>
              <p className="news-summary">
                {truncateText(
                  article.summary ||
                    article.description ||
                    "No description available",
                  200
                )}
              </p>
              <p className="news-date">
                {article.published_date
                  ? new Date(article.published_date).toLocaleDateString()
                  : "No date"}
              </p>
              {article.link && (
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-link"
                >
                  Read More →
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default NewsDisplay;
