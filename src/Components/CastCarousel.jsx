import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const handleDragStart = (e) => e.preventDefault();

function CastCarousel(credit) {
	const image = "https://image.tmdb.org/t/p/w500/";
	const casting = credit.credit.cast;

	const items = casting.slice(0, 15).map((actor) => (
		<div className="carouselItem">
			<img
				src={actor.profile_path ? `${image}${actor.profile_path}` : null}
				alt={actor?.name}
				onDragStart={handleDragStart}
				className="carouselItem__img"
			/>
			<b className="carouselItem__text text-center">{actor?.name}</b>
			<span className="carouselItem__text text-center">"{actor.character}"</span>
		</div>
	));

	const responsive = {
		0: {
			items: 3,
		},
		512: {
			items: 3,
		},
		1024: {
			items: 4,
		},
	};

	return (
		<AliceCarousel
			mouseTracking
			// infinite
			disableDotsControls
			// disableButtonsControls
			responsive={responsive}
			items={items}
		/>
	);
}

export default CastCarousel;
