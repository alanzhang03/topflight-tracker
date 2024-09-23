import Image from "next/image";
import "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="main-page-container">
        <h1>Welcome to the TopFlight Tracker</h1>
        <p>
          Explore detailed standings, match history, lineups, and more from the
          Premier League, La Liga, Bundesliga, and Champions League.
        </p>
      </div>
    </>
  );
}
