"use client";
import { useState, useEffect } from "react";
import { useFavorites } from "@/app/context/FavoritesContext";
import FavoriteTeamCard from "../../../components/FavoriteTeamCard";
import styles from "./favorites.module.scss";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [leagueData, setLeagueData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!favorites.length) {
      setLoading(false);
      return;
    }

    const uniqueLeagues = [...new Set(favorites.map((f) => f.leagueCode).filter(Boolean))];

    const fetchAll = async () => {
      setLoading(true);
      const settled = await Promise.all(
        uniqueLeagues.map(async (code) => {
          const [fixturesRes, resultsRes] = await Promise.all([
            fetch(`/api/fixtures/${code}`).then((r) => r.json()),
            fetch(`/api/results/${code}`).then((r) => r.json()),
          ]);
          return {
            code,
            fixtures: fixturesRes.fixtures || [],
            results: resultsRes.results || [],
          };
        })
      );

      const data = {};
      settled.forEach(({ code, fixtures, results }) => {
        data[code] = { fixtures, results };
      });
      setLeagueData(data);
      setLoading(false);
    };

    fetchAll();
  }, [favorites]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Favorite Clubs</h1>

      {loading && favorites.length > 0 && (
        <div className={styles.loadingGrid}>
          {favorites.map((t) => (
            <div key={t.id} className={styles.skeleton} />
          ))}
        </div>
      )}

      {!loading && favorites.length === 0 && (
        <div className={styles.empty}>
          <span className={styles.emptyHeart}>♡</span>
          <p>No favorites yet.</p>
          <p className={styles.emptyHint}>Head to a league page and tap the heart on a team to add it here.</p>
        </div>
      )}

      {!loading && favorites.length > 0 && (
        <div className={styles.grid}>
          {favorites.map((team) => {
            const league = leagueData[team.leagueCode] || { fixtures: [], results: [] };

            const teamFixtures = league.fixtures
              .filter((f) => f.homeTeam.id === team.id || f.awayTeam.id === team.id)
              .sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate))
              .slice(0, 3);

            const teamResults = league.results
              .filter((r) => r.homeTeam.id === team.id || r.awayTeam.id === team.id)
              .sort((a, b) => new Date(b.utcDate) - new Date(a.utcDate))
              .slice(0, 3);

            return (
              <FavoriteTeamCard
                key={team.id}
                team={team}
                fixtures={teamFixtures}
                results={teamResults}
                onRemove={toggleFavorite}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
