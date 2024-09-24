"use client"; // This component runs on the client side

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StandingsTable({ leagueCode }) {
  const [standings, setStandings] = useState([]); // Ensure it's initialized as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.football-data.org/v4/competitions/${leagueCode}/standings`,
          {
            headers: {
              "X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
            },
          }
        );
        // Ensure response.data.standings exists and is an array
        const fetchedStandings = response.data.standings?.[0]?.table || [];
        setStandings(fetchedStandings);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchStandings();
  }, [leagueCode]);

  if (loading) return <p>Loading standings...</p>;
  if (error) return <p>Error loading standings: {error.message}</p>;

  return (
    <div>
      <h1>League Standings</h1>
      <table className={styles.standingsTable}>
        <thead>
          <tr>
            <th>Position</th>
            <th>Team</th>
            <th>Points</th>
            <th>Played</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
            <th>Goal Difference</th>
          </tr>
        </thead>
        <tbody>
          {/* Add a safe check before mapping standings */}
          {standings.length > 0 ? (
            standings.map((team) => (
              <tr key={team.team.id}>
                <td>{team.position}</td>
                <td>{team.team.name}</td>
                <td>{team.points}</td>
                <td>{team.playedGames}</td>
                <td>{team.won}</td>
                <td>{team.lost}</td>
                <td>{team.draw}</td>
                <td>{team.goalDifference}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No standings available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
