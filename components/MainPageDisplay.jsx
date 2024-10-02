"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
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

  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything`, {
          params: {
            q: "Premier League OR Bundesliga OR La Liga OR Champions League NOT cricket NOT NFL NOT NBA",
            language: "en",
            sortBy: "publishedAt",
            pageSize: 8,
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

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.to(".hero-content", {
      delay: 0.25,
      opacity: 1,
      duration: 2,
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

  useEffect(() => {
    if (news.length > 0) {
      gsap.to(".news-item", {
        scrollTrigger: {
          trigger: ".news-item",
          start: "top 60%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        stagger: {
          each: 0.2,
        },
      });
    }
  }, [news]);

  return (
    <div className="main-page-container">
      {/* Hero Section */}
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
            <Link
              href="/leagues/premier-league"
              rel="noopener noreferrer"
              className="news-item-link"
              target="_blank"
            >
              <img src="/images/premier-league.svg" alt="Premier League" />
            </Link>
          </div>
          <div className="league-card">
            <Link
              href="/leagues/bundesliga"
              rel="noopener noreferrer"
              className="news-item-link"
              target="_blank"
            >
              <img src="/images/bundesliga.svg" alt="Bundesliga" />
            </Link>
          </div>
          <div className="league-card">
            <Link
              href="/leagues/la-liga"
              rel="noopener noreferrer"
              className="news-item-link"
              target="_blank"
            >
              <img src="/images/la-liga.svg" alt="La Liga" />
            </Link>
          </div>
          <div className="league-card">
            <Link
              href="/leagues/champions-league"
              rel="noopener noreferrer"
              className="news-item-link"
              target="_blank"
            >
              <img src="/images/champions-league.svg" alt="Champions League" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-section-gsap">
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
        </div>
      </section>

      {/* Recent News Section */}
      <section className="news-section">
        <h2>Latest News & Stories</h2>
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
                <div className="news-item">
                  <img src={article.urlToImage} alt={article.title} />
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default MainPageDisplay;
