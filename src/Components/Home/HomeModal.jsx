import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import DayJS from "react-dayjs";
import env from "react-dotenv";
import CastCarousel from "../CastCarousel";
import LikeDislike from "../LikeDislike";

function MovieModal(data) {
	const image = "https://image.tmdb.org/t/p/w500";
	const media_type = data.data.data.media_type;
	const movie_id = data.data.data.id;
	///// Show/hide Modal /////
	const [show, setShow] = useState(false);
	const [movie, setMovie] = useState([]);
	const [credit, setCredit] = useState([]);
	const handleClose = () => {
		setShow(false);
	};
	const handleShow = () => {
		setShow(true);
	};

	///// Get Movies informations //////
	const fetchMovie = () => {
		if (media_type === "movie") {
			Axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${env.API_KEY}&language=fr`)
				.then((response) => {
					setMovie(response.data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (media_type === "tv") {
			Axios.get(`https://api.themoviedb.org/3/tv/${movie_id}?api_key=${env.API_KEY}&language=fr`)
				.then((response) => {
					setMovie(response.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	///// Get Cast's movie informations //////
	const fetchMovieCredit = () => {
		if (media_type === "movie") {
			Axios.get(
				`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${env.API_KEY}&language=fr`
			)
				.then((response) => {
					setCredit(response.data);
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (media_type === "tv") {
			Axios.get(
				`https://api.themoviedb.org/3/tv/${movie_id}/credits?api_key=${env.API_KEY}&language=fr`
			)
				.then((response) => {
					setCredit(response.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	useEffect(() => {
		window.scroll(0, 0);
		fetchMovie();
		fetchMovieCredit();
	}, []);

	return (
		<>
			<Button className="modal__openBtn" onClick={handleShow}>
				+ infos
			</Button>
			<Modal className="modal" show={show} onHide={handleClose}>
				<Image
					src={image + movie.backdrop_path}
					alt={`Picture of ${movie.title || movie.name}`}
					className="modal__img"
				/>
				<Modal.Header className="modal__header">
					<Modal.Title className="modal__title">
						{movie.title || movie.name}
						<LikeDislike id={movie} media_type={media_type} />
					</Modal.Title>
					<span className="modal__titleTag">{movie.tagline}</span>
				</Modal.Header>
				<Modal.Body className="modal__body">
					<span className="modal__text">
						Recommandé par les utilisateurs : {movie.vote_average * 10} %
					</span>
					<hr />
					<p className="modal__text">{movie.overview}</p>
					<hr />
					<span className="modal__text">
						Date de sortie :{" "}
						<DayJS format="DD/MM/YYYY">{movie.first_air_date || movie.release_date}</DayJS>
					</span>
					<hr />
					<span className="modal__text">
						Genre : {movie.genres ? movie.genres.map((genre) => genre.name + ", ") : null}
					</span>
					{movie.number_of_seasons ? (
						<>
							<hr />
							<span className="modal__text">
								Nombre de saisons : {movie.number_of_seasons} || Nombre d'épisodes :{" "}
								{movie.number_of_episodes}
							</span>
						</>
					) : null}
					{movie.production_companies ? (
						<>
							<hr />
							<span className="modal__text">
								Production : {movie.production_companies.map((company) => company.name + ", ")}
							</span>
						</>
					) : null}
					{movie.networks ? (
						<>
							<hr />
							<span className="modal__text">
								Plateforme : {movie.networks.map((network) => network.name + ", ")}
							</span>
						</>
					) : null}
					<hr />
					<CastCarousel credit={credit} />
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

export default MovieModal;
