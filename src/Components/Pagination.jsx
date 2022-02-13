import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import MovieCards from "./MovieCards";

export const Pagination = (props) => {
	const [pageNumber, setPageNumber] = useState(0);

	const moviesPerPage = 6;
	const pagesVisited = pageNumber * moviesPerPage;

	const pageCount = Math.ceil(props.movies.length / moviesPerPage);
	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	return (
		<>
		<MovieCards currentMovies={props.movies} />
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
		</>
	);
};
