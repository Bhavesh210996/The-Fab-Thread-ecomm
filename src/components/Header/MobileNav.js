import { HiBars3, HiShoppingBag } from "react-icons/hi2"
import Logo from "./Logo"
import useCartCount from "../../Hooks/useCartCount";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSidebar } from "../../context/CartSlice";

function MobileNav() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartCount} = useCartCount();

    return (
        <nav className="mobile-nav">
          <div className="mobile-header-menu-icon">
            <button type="button" className="menu-button" onClick={() => dispatch(toggleSidebar(true))}><HiBars3 /></button>
            <Logo />
          </div>
          
          <ul className="mobile-nav__list">
            <li className="nav__item">
              <button className="nav__btn nav__btn--bookmarks" onClick={() => navigate("/cart")}>
                <HiShoppingBag />
                {cartCount ? <p className="cartCount">{cartCount}</p> : ""}
              </button>
            </li>
          </ul>
        </nav>
    )
}

export default MobileNav
