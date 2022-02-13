import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movies from "./Pages/Movies";
import Series from "./Pages/Series";
import Home from "./Pages/Home";
import { Fragment } from "react";
import Favorites from "./Pages/Favorites";

function App() {
	return (
		<Router>
			<Fragment>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/movies" element={<Movies />} />
					<Route path="/series" element={<Series />} />
					<Route path="/favorites" element={<Favorites />} />
				</Routes>
			</Fragment>
		</Router>
	);
}

export default App;
