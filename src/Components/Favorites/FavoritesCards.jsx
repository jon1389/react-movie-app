import React, { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import FavoritesModal from "./FavoritesModal";
import Axios from "axios";
import env from "react-dotenv";

function FavoritesCards() {
	const image = "https://image.tmdb.org/t/p/w500";
	const [favoritesList, setFavoritesList] = useState([]);

	/// Fonction pour le re-render ///
	const [isUpdate, setIsUpdate] = useState(false);
	function HandleUpdate() {
		if (isUpdate === true) {
			setIsUpdate(false);
		} else {
			setIsUpdate(true);
		}
	}

	function fetchFavoritesList() {
		const movieFavorites = JSON.parse(localStorage.getItem("favorites-movies-list"));
		const serieFavorites = JSON.parse(localStorage.getItem("favorites-series-list"));
		if (movieFavorites) {
			for (let i = 0; i < movieFavorites.length; i++) {
				Axios.get(
					`https://api.themoviedb.org/3/movie/${movieFavorites[i]}?api_key=${env.API_KEY}&language=fr-FR`
				)
					.then((response) =>
						setFavoritesList((favoritesList) => [...favoritesList, response.data])
					)
					.catch((err) => {
						console.log(err);
					});
			}
		}
		if (serieFavorites) {
			for (let i = 0; i < serieFavorites.length; i++) {
				Axios.get(
					`https://api.themoviedb.org/3/tv/${serieFavorites[i]}?api_key=${env.API_KEY}&language=fr-FR`
				)
					.then((response) =>
						setFavoritesList((favoritesList) => [...favoritesList, response.data])
					)
					.catch((err) => {
						console.log(err);
					});
			}
		}
	}
	useEffect(() => {
		window.scroll(0, 0);
		fetchFavoritesList();
	}, []);

	// console.log(favoritesList);

	return (
		<div className="cards">
			{favoritesList ? (
				<>
					{favoritesList.map((favorite) => (
						<Card className="card" key={favorite.id}>
							<Card.Img
								className="card__img"
								variant="top"
								src={image + favorite.poster_path}
								alt={`Picture of ${favorite.title}`}
							/>
							<Card.Body className="card__body">
								<Card.Title className="card__body__title">
									{favorite.title || favorite.name}
								</Card.Title>
								<FavoritesModal data={favorite} />
							</Card.Body>
						</Card>
					))}
				</>
			) : (
				"Vous n'avez pas de favoris"
			)}
		</div>
	);
}

export default FavoritesCards;
