# ⚽ TopFlight Tracker

**TopFlight Tracker** is a football statistics and analytics web application built with **Next.js**, providing real-time match data, league standings, fixtures, and curated football news.  
It tracks top European leagues including the **Premier League**, **La Liga**, **Bundesliga**, **Serie A**, **Ligue 1**, and the **UEFA Champions League** — all in one clean, animated interface.

---

##  Overview

TopFlight Tracker combines live football data and media updates into an interactive and visually dynamic experience.  
Using the **Football-Data API** for match data and the **NewscatcherAPI** for football news, the app ensures fans stay informed with accurate, cached, and up-to-date content.

---

##  Key Features

###  Live Standings & Match Data
- Displays up-to-date standings, team positions, goal differentials, and points.  
- Interactive tables for multiple leagues (Premier League, La Liga, Bundesliga, etc.).

###  Fixtures & Results
- View both upcoming fixtures and past results.  
- Organized by league with live refreshes for ongoing matches.

###  Curated Football News
- Integrates with **NewscatcherAPI** to fetch high-quality football news articles.  
- News is filtered by league context (e.g., only Premier League articles on the Premier League page).

###  Caching & API Optimization
- Integrates **Redis** caching to reduce API calls and improve performance.  
- Cached data automatically refreshes every 7 days to maintain accuracy.

###  Smooth Animations
- Built with **GSAP + ScrollTrigger** for seamless, reactive animations.  
- Animates league pages, icons, and transitions for a premium feel.

###  Dynamic League Routing
- Each league has its own dedicated route (e.g., `/premier-league`, `/la-liga`, `/bundesliga`, `/champions-league`).  
- Shared components like `StandingsTable`, `FixturesList`, and `NewsDisplay` handle league-specific props dynamically.

---

##  Technologies Used

| Category | Technologies |
|-----------|---------------|
| **Framework** | [Next.js 14](https://nextjs.org/) |
| **Frontend Library** | [React](https://react.dev/) |
| **Styling** | [SCSS Modules](https://sass-lang.com/documentation/) |
| **Animations** | [GSAP](https://greensock.com/gsap/) with ScrollTrigger |
| **APIs** | [Football-Data.org](https://www.football-data.org/), [NewscatcherAPI](https://newscatcherapi.com/) |
| **Caching** | [Redis](https://redis.io/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---


---

##  API Integration

###  Football-Data API
Used to fetch:
- Standings  
- Fixtures and results  
- Team and league information  

### 📰 NewscatcherAPI
Used to fetch:
- Football-related articles  
- League-specific news feeds  
- Cached for 7 days to reduce API rate limits  

---

##  Planned Enhancements

- 🔍 Player statistics and top scorers  
- 📱 Mobile-first redesign and PWA support  
- 💾 Persistent data storage with PostgreSQL  
- 🧠 AI-powered “Match Insights” section (summarized key stats per fixture)

---

##  Developer Notes

- Built using the **App Router** (`layout.js`, `page.js`) in Next.js 14+.  
- Animations are **GSAP timeline-based** with **ScrollTrigger** hooks for section transitions.  
- Uses **modular SCSS** for theme consistency across leagues.  
- Caching layer ensures **minimal API throttling** and **fast page load times**.

---

##  Acknowledgments

- [Football-Data API](https://www.football-data.org/) — for match and league data  
- [NewscatcherAPI](https://newscatcherapi.com/) — for real-time football news  
- [GSAP](https://greensock.com/gsap/) — for animation magic  

---

## 📬 Contact

Developed by **Alan Zhang**  
📧 [alan.s.zhang@gmail.com](mailto:alan.s.zhang@gmail.com)  
🌐 [azhang03.vercel.app](https://azhang03.vercel.app)


