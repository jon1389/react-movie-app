import React, { useState } from "react";
import { Card } from "react-bootstrap";
import HomeModal from "./HomeModal";

const HomeCards = (id) => {
	const image = "https://image.tmdb.org/t/p/w500";
	/// Fonction pour le re-render ///
	// const [isUpdate, setIsUpdate] = useState(false);
	// function HandleUpdate() {
	// 	if (isUpdate === true) {
	// 		setIsUpdate(false);
	// 	} else {
	// 		setIsUpdate(true);
	// 	}
	// }
	return (
		<>
			{/* {props.movies.map((movie) => ( */}
			<React.Fragment key={id}>
				<Card className="card">
					<Card.Img
						className="card__img"
						variant="top"
						src={image + id.poster}
						alt={`Picture of ${id.title}`}
					/>
					<Card.Body className="card__body">
						<Card.Title className="card__body__title">{id.title}</Card.Title>
						<HomeModal data={id} />
					</Card.Body>
				</Card>
			</React.Fragment>
			{/* ))} */}
		</>
	);
};
export default HomeCards;
