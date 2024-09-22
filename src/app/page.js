import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function Home() {
	return (
		<>
			<Navbar />
			<h1>Welcome to the TopFlight Tracker</h1>
			<p>
				Explore detailed standings, match history, lineups, and more from the
				Premier League, La Liga, Bundesliga, and Champions League.
			</p>
		</>
	);
}
