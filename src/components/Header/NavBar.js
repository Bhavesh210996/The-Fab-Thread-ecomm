import { NavLink, useNavigate } from "react-router-dom"
import { HiUser, HiShoppingBag, HiHeart } from "react-icons/hi2";
import SearchBox from "./SearchBox"
import { useCartCount } from "../../context/CartEntryCountContextApi";
import { useState } from "react";
import { useUser } from "../Authentication/useUser";
import { useLogout } from "../Authentication/useLogout";
import UserProfile from "../ui/UserProfile";

function NavBar() {
  const [isDrpDwnOpen, setIsDrpDwnOpen] = useState(null);
  const navigate = useNavigate();
  const {cartCount} = useCartCount();
  
  const {user} = useUser();
  const {logout, userLoggingOut} = useLogout();

  // console.log("user", user)
  const handleDrpDwnToggle = () => {
    setIsDrpDwnOpen(() => !isDrpDwnOpen)
  }

  const handleLogout = () => {
    logout()
  }
    return (
        <nav className="nav">
            <ul className="nav__list">
                <li className="nav__item">
                  <button className="nav__btn nav__btn--add-recipe" onClick={() => navigate("/men")}>
                    <span>Men</span>
                  </button>
                </li>
                <li className="nav__item">
                  <button className="nav__btn nav__btn--bookmarks" onClick={() => navigate("/women")}>
                    <span>Women</span>
                  </button>
                </li>
                <li className="nav__item">
                  <button className="nav__btn nav__btn--bookmarks">
                    <span>Kids</span>
                  </button>
                </li>
            </ul>
            <SearchBox />
            <ul className="nav__list">
                <li className="nav__item" onMouseEnter={handleDrpDwnToggle} onMouseLeave={handleDrpDwnToggle}>
                  <button className="nav__btn nav__btn--add-recipe">
                    <HiUser />
                    <span>Profile</span>
                  </button>
                  {(isDrpDwnOpen && user) && <UserProfile onLogout={handleLogout} userLoggingOut={userLoggingOut}/>}
                  {(isDrpDwnOpen && !user) && <div className="profile-elements">
                    <div className="logindrpden-heading">
                      <span className="welcome-text">Welcome</span>
                      <span>To place the order, Please</span>
                    </div>
                    <NavLink className="drpdwn-link login" to="login">Login/SignUp</NavLink>
                  </div>}
                </li>
                <li className="nav__item">
                  <button className="nav__btn nav__btn--bookmarks">
                    <HiHeart />
                    <span>Wishlist</span>
                  </button>
                </li>
                <li className="nav__item">
                  <button className="nav__btn nav__btn--bookmarks" onClick={() => navigate("/cart")}>
                    <HiShoppingBag />
                    <span>Cart</span>
                    {cartCount ? <p className="cartCount">{cartCount}</p> : ""}
                  </button>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar
