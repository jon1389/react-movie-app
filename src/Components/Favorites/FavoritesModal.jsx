import React, { useEffect, useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import DayJS from "react-dayjs";
import LikeDislike from "../LikeDislike";
import env from "react-dotenv";
import Axios from "axios";

function FavoritesModal(data) {
	const image = "https://image.tmdb.org/t/p/w500";
	const dataType = data.data;
	const movie_id = data.data.id;
	const [favoritesList, setFavoritesList] = useState([]);

	///// Show/hide Modal /////
	const [show, setShow] = useState(false);
	const handleClose = () => {
		setShow(false);
	};
	const handleShow = () => {
		setShow(true);
	};
	/////////////////////////////

	const fetchFavorites = () => {
		if (dataType.release_date) {
			Axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${env.API_KEY}&language=fr`)
				.then((response) => {
					setFavoritesList(response.data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (dataType.first_air_date) {
			Axios.get(`https://api.themoviedb.org/3/tv/${movie_id}?api_key=${env.API_KEY}&language=fr`)
				.then((response) => {
					setFavoritesList(response.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	useEffect(() => {
		window.scroll(0, 0);
		fetchFavorites();
	}, []);

	return (
		<>
			<Button className="modal__openBtn" onClick={handleShow}>
				+ infos
			</Button>
			<Modal className="modal" show={show} onHide={handleClose}>
				<Image
					src={image + favoritesList.backdrop_path}
					alt={`Picture of ${favoritesList.title || favoritesList.name}`}
					className="modal__img"
				/>
				<Modal.Header className="modal__header">
					<Modal.Title className="modal__title">
						{favoritesList.title || favoritesList.name}
						<LikeDislike id={favoritesList} />
					</Modal.Title>
					<span className="modal__titleTag">{favoritesList.tagline}</span>
				</Modal.Header>
				<Modal.Body>
					<span className="modal__text">
						Recommandé par les utilisateurs : {favoritesList.vote_average * 10} %
					</span>
					<hr />
					<p className="modal__text">{favoritesList.overview}</p>
					<hr />
					<span className="modal__text">
						Date de sortie :{" "}
						<DayJS format="DD/MM/YYYY">
							{favoritesList.first_air_date || favoritesList.release_date}
						</DayJS>
					</span>
					<hr />
					<span className="modal__text">
						Genre :{" "}
						{favoritesList.genres ? favoritesList.genres.map((genre) => genre.name + ", ") : null}
					</span>
					{favoritesList.number_of_seasons ? (
						<>
							<hr />
							<span className="modal__text">
								Nombre de saisons : {favoritesList.number_of_seasons} || Nombre d'épisodes :{" "}
								{favoritesList.number_of_episodes}
							</span>
						</>
					) : null}
					{favoritesList.production_companies ? (
						<>
							<hr />
							<span className="modal__text">
								Production :{" "}
								{favoritesList.production_companies.map((company) => company.name + ", ")}
							</span>
						</>
					) : null}
					{favoritesList.networks ? (
						<>
							<hr />
							<span className="modal__text">
								Plateforme : {favoritesList.networks.map((network) => network.name + ", ")}
							</span>
						</>
					) : null}
				</Modal.Body>
				<Modal.Footer>
					<Button className="modal__closeBtn" variant="secondary" onClick={handleClose}>
						Fermer
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default FavoritesModal;
