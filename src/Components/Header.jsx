import BurgerMenu from "./BurgerMenu";

function Header() {
	return (
		<>
			<header className="header">
				<BurgerMenu />
				<a href="/" className="header__title">
					React Movie App
				</a>
			</header>
		</>
	);
}

export default Header;
