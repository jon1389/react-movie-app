import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../Components/Header";
import Serie from "../Components/Series/Serie";

function Series() {
	return (
		<>
			<Header />
			<Serie />
		</>
	);
}

export default Series;
