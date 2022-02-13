import { BrowserRouter as Router, Route } from "react-router-dom";
import Movie from "../Components/Movies/Movie";
import Header from "../Components/Header";

function Movies() {
	return (
		<>
			<Header />
			<Movie />
		</>
	);
}

export default Movies;
