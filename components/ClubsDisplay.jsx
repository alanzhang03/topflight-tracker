"use client";

import "./styles/ClubsDisplay.scss";
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
    return <p>Error loading clubs {error}</p>;
  }

  if (!clubs.length) {
    return <p>No clubs data available.</p>;
  }

  const leagueName = leagueNames[leagueCode] || leagueCode;

  return (
    <div className="clubs-container">
      <h2>{leagueName}</h2>
      <div className="clubs-row">
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
            <div key={club.id} className="club-item-container">
              <a
                href={clubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="club-item-link"
              >
                <div className="club-item">
                  <div></div>
                  <img
                    src={club.crest}
                    alt={`${club.name} logo`}
                    className="club-logo"
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
