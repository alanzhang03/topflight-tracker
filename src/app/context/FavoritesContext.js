"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id ?? null;
  const isLoggedIn = !!userId;

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (status === "loading") return;

    if (isLoggedIn) {
      fetch("/api/favorites")
        .then((res) => res.json())
        .then((data) => {
          if (data.favorites) setFavorites(data.favorites);
        })
        .catch(console.error);
    } else {
      const stored = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(stored);
    }
  }, [isLoggedIn, status]);

  // Persist to localStorage when not logged in
  useEffect(() => {
    if (!isLoggedIn && status !== "loading") {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, isLoggedIn, status]);

  const toggleFavorite = async (item) => {
    const isFav = favorites.some((fav) => fav.id === item.id);

    if (isLoggedIn) {
      if (isFav) {
        await fetch("/api/favorites", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ teamId: item.id }),
        });
        setFavorites((prev) => prev.filter((fav) => fav.id !== item.id));
      } else {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        setFavorites((prev) => [...prev, item]);
      }
    } else {
      setFavorites((prev) =>
        isFav ? prev.filter((fav) => fav.id !== item.id) : [...prev, item]
      );
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
