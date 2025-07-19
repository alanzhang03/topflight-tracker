"use client";
import styles from "./styles/ClubsDisplay.module.scss";
import { useFavorites } from "@/app/context/FavoritesContext";

const leagueNames = {
  PL: "Premier League",
  BL1: "Bundesliga",
  PD: "La Liga",
  CL: "Champions League",
};

export default function ClubsDisplay({
  clubs = [],
  error,
  leagueCode,
  teamLinks,
}) {
  const { favorites, toggleFavorite } = useFavorites();

  if (error) {
    return <p className={styles.clubsError}>Error loading clubs: {error}</p>;
  }

  if (!clubs.length) {
    return <p className={styles.clubsEmpty}>No clubs data available.</p>;
  }

  const leagueName = leagueNames[leagueCode] || leagueCode;

  return (
    <div className={styles.clubsContainer}>
      <h2>{leagueName}</h2>
      <div className={styles.clubsRow}>
        {clubs.map((club) => {
          const clubLink =
            teamLinks[
              club.name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, "")
                .replace(/\s+/g, "-")
            ];
          const isFavorite = favorites.some((fav) => fav.id === club.id);

          return (
            <div key={club.id} className={styles.clubItemContainer}>
              <a
                href={clubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.clubItemLink}
              >
                <div className={styles.clubItem}>
                  <img
                    src={club.crest}
                    alt={`${club.name} logo`}
                    className={styles.clubLogo}
                  />
                  <span>{club.name}</span>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
