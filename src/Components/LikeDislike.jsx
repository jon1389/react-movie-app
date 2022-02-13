import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(fas, far);

function LikeDislike(id) {
	const favoriteId = id.id.id;
	const media_type = id.media_type;
	const [favoritesMovies, setFavoritesMovies] = useState([]);
	const [favoritesSeries, setFavoritesSeries] = useState([]);

	useEffect(() => {
		const movieFavorites = JSON.parse(localStorage.getItem("favorites-movies-list"));
		const serieFavorites = JSON.parse(localStorage.getItem("favorites-series-list"));
		if (movieFavorites) {
			setFavoritesMovies(movieFavorites);
		}
		if (serieFavorites) {
			setFavoritesSeries(serieFavorites);
		}
	}, []);

	const saveMovieToLocalStorage = (items) => {
		localStorage.setItem("favorites-movies-list", JSON.stringify(items));
	};

	const saveSerieToLocalStorage = (items) => {
		localStorage.setItem("favorites-series-list", JSON.stringify(items));
	};

	function addFavorite() {
		if (media_type === "movie") {
			const newMoviesFavoriteList = [...favoritesMovies, favoriteId];
			setFavoritesMovies(newMoviesFavoriteList);
			saveMovieToLocalStorage(newMoviesFavoriteList);
			console.log("Film ajouté aux favoris");
		} else if (media_type === "tv") {
			const newSeriesFavoriteList = [...favoritesSeries, favoriteId];
			setFavoritesSeries(favoritesSeries);
			saveSerieToLocalStorage(newSeriesFavoriteList);
			console.log("Série ajoutée aux favoris");
		} else {
			console.log("Vous ne pouvez pas remettre ce titre en favoris depuis cette page");
		}
	}

	function removeFavorite() {
		if (media_type === "movie") {
			const newMoviesFavoriteList = favoritesMovies.filter((favourite) => favourite !== favoriteId);
			setFavoritesMovies(newMoviesFavoriteList);
			saveMovieToLocalStorage(newMoviesFavoriteList);
			console.log("Film supprimé des favoris");
		} else if (media_type === "tv") {
			const newSeriesFavoriteList = favoritesSeries.filter((favourite) => favourite !== favoriteId);
			setFavoritesSeries(newSeriesFavoriteList);
			saveSerieToLocalStorage(newSeriesFavoriteList);
			console.log("Série supprimée des favoris");
		} else {
			const newMoviesFavoriteList = favoritesMovies.filter((favourite) => favourite !== favoriteId);
			setFavoritesMovies(newMoviesFavoriteList);
			saveMovieToLocalStorage(newMoviesFavoriteList);
			const newSeriesFavoriteList = favoritesSeries.filter((favourite) => favourite !== favoriteId);
			setFavoritesSeries(newSeriesFavoriteList);
			saveSerieToLocalStorage(newSeriesFavoriteList);
			console.log("supprimé");
		}
	}

	const handleFavorite = () => {
		if (!favoritesMovies.includes(favoriteId) && !favoritesSeries.includes(favoriteId)) {
			addFavorite();
		} else {
			removeFavorite();
		}
	};
	// console.log(favorites);
	return (
		<button className="likeButton" onClick={handleFavorite}>
			{favoritesMovies.includes(favoriteId) || favoritesSeries.includes(favoriteId) ? (
				<FontAwesomeIcon icon={["fas", "heart"]} className="likeButton__icon likeButton__liked" />
			) : (
				<>
					<FontAwesomeIcon
						icon={["far", "heart"]}
						className="likeButton__icon likeButton__unlike"
					/>
					<FontAwesomeIcon icon={["fas", "heart"]} className="likeButton__icon likeButton__like" />
				</>
			)}
			{/* <FontAwesomeIcon icon={["far", "heart"]} className="likeButton__icon likeButton__unlike" />
			<FontAwesomeIcon icon={["fas", "heart"]} className="likeButton__icon likeButton__like" /> */}
		</button>
	);
}

export default LikeDislike;
