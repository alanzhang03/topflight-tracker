"use client";
import React from "react";
import HomepageDisplay from "../../../../components/HomepageDisplay";

const page = () => {
  const routeLinks = [
    { name: "Standings", path: "/leagues/la-liga/standings" },
    { name: "Clubs", path: "/leagues/la-liga/teams" },
    { name: "Fixtures", path: "/leagues/la-liga/fixtures" },
  ];

  return (
		<HomepageDisplay
			leagueName="La Liga"
			logo="/images/la-liga.svg"
			description="Explore the latest standings, fixtures, clubs, and more from La Liga."
			routeLinks={routeLinks}
			leagueCode="epl"
		/>
	);
};

export default page;
