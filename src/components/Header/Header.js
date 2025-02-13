import NavBar from "./NavBar"
import "../Header/Header.css"
import Logo from "./Logo"

function Header() {
    return (
        <header className="header">
            <Logo />
            <NavBar />
        </header>
    )
}

export default Header
