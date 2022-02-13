import React from "react";
import { push as Menu } from "react-burger-menu";

function BurgerMenu() {
	return (
		<Menu className="burger bm-burger-bars">
			<a id="home" className="menu-item" href="/">
				Accueil
			</a>
			<a id="movies" className="menu-item" href="/movies">
				Films
			</a>
			<a id="series" className="menu-item" href="/series">
				Séries
			</a>
			<a id="favorites" className="menu-item" href="/favorites">
				Favoris
			</a>
		</Menu>
	);
}

export default BurgerMenu;
