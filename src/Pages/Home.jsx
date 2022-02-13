import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../Components/Header";
import Main from "../Components/Home/Main";

function Home() {
	return (
		<>
			<Header />
			<Main />
		</>
	);
}

export default Home;
