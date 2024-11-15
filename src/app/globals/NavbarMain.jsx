"use client";
import React from "react";
import Link from "next/link";
import "./NavbarMain.scss";

const NavbarMain = () => {
	return (
		<nav className="navbar">
			<div className="navbar-container">
				<ul className="navbar-menu">
					<li>
						<Link href="/">Home</Link>
					</li>
					<li>
						<Link href="/favorites">Favorites</Link>
					</li>

					<li>
						<Link href="/leagues/bundesliga">Bundesliga</Link>
					</li>
					<li>
						<Link href="/leagues/premier-league">Premier League</Link>
					</li>

					<li>
						<Link href="/leagues/champions-league">Champions League</Link>
					</li>

					<li>
						<Link href="/leagues/la-liga">La Liga</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default NavbarMain;
