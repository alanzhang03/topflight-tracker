import React from "react";
import { useFavorites } from "../src/app/context/FavoritesContext";
import { Heart } from "lucide-react";
import styles from "./styles/FavoriteButton.module.scss";

const FavoriteButton = ({
  club,
  size = "medium",
  showText = false,
  className = "",
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isClubFavorite = isFavorite(club.id);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(club);
  };

  const buttonClass = `${styles.favoriteButton} ${styles[size]} ${className}`;
  const iconClass = `${styles.icon} ${
    isClubFavorite ? styles.filled : styles.outlined
  }`;

  return (
    <button
      className={buttonClass}
      onClick={handleToggle}
      aria-label={isClubFavorite ? "Remove from favorites" : "Add to favorites"}
      title={isClubFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isClubFavorite ? (
        <Heart className={iconClass} fill="currentColor" />
      ) : (
        <Heart className={iconClass} />
      )}
      {showText && (
        <span className={styles.text}>{isClubFavorite ? "Remove" : "Add"}</span>
      )}
    </button>
  );
};

export default FavoriteButton;
