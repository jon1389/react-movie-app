import React, { useEffect, useState } from "react";
import HomeCards from "../Home/HomeCards";
import Axios from "axios";
import env from "react-dotenv";
import ReactPaginate from "react-paginate";

function Serie(props) {
	const [movies, setMovies] = useState([]);
	const [pageNumber, setPageNumber] = useState(0);
	const [numOfPages, setNumOfPages] = useState();
	const moviesPerPage = 10;
	const pagesVisited = pageNumber * moviesPerPage;

	const pageCount = Math.ceil(movies.length / moviesPerPage);
	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	const fetchMovies = async () => {
		await Axios.get(
			`https://api.themoviedb.org/3/trending/tv/week?api_key=${env.API_KEY}&language=fr`
		)
			.then((response) => {
				setMovies(response.data.results);
				setNumOfPages(response.total_pages);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		window.scroll(0, 0);
		fetchMovies();
	}, []);

	return (
		<div>
			<div className="cards">
				{movies &&
					movies
						.slice(pagesVisited, pagesVisited + moviesPerPage)
						.map((movie) => (
							<HomeCards
								data={movie}
								key={movie.id}
								id={movie.id}
								poster={movie.poster_path}
								title={movie.title || movie.name}
								overview={movie.overview}
								date={movie.first_air_date || movie.release_date}
								media_type="movie"
								vote_average={movie.vote_average}
							/>
						))}
			</div>
			<ReactPaginate
				className="cards__pagination"
				previousLabel={"< Précédent"}
				nextLabel={"Suivant >"}
				breakLabel="..."
				pageCount={pageCount}
				onPageChange={changePage}
				breakClassName={"page-item"}
				breakLinkClassName={"page-link"}
				containerClassName={"pagination"}
				pageClassName={"page-item"}
				pageLinkClassName={"page-link"}
				previousClassName={"page-item"}
				previousLinkClassName={"page-link"}
				nextClassName={"page-item"}
				nextLinkClassName={"page-link"}
				activeClassName={"active"}
			/>
		</div>
	);
}

export default Serie;
