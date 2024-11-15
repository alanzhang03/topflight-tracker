"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
	const [favorites, setFavorites] = useState([]);
	useEffect(() => {
		const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
		setFavorites(storedFavorites);
	}, []);

	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	const toggleFavorite = (item) => {
		setFavorites((prevFavorites) =>
			prevFavorites.some((fav) => fav.id === item.id)
				? prevFavorites.filter((fav) => fav.id !== item.id)
				: [...prevFavorites, item]
		);
	};

	return (
		<FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
			{children}
		</FavoritesContext.Provider>
	);
};

export const useFavorites = () => useContext(FavoritesContext);
