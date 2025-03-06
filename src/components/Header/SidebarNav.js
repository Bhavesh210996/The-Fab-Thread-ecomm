import { HiMiniChevronRight, HiMiniXMark, HiUser } from "react-icons/hi2"
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom"
import { toggleSidebar } from "../../context/CartSlice";
import SpinnerMini from "../ui/SpinnerMini";
import { useUser } from "../Authentication/useUser";
import { useLogout } from "../Authentication/useLogout";

function SidebarNav() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isSidebarOpen} = useSelector((store) => store.cartStates)
    const {logout, userLoggingOut} = useLogout();
    // const {user, isAuthenticated} = useUser();
    const {user, isAuthenticated} = useSelector((store) => store.cartStates);
    const {fullName} = user?.user_metadata || {};

    return (
        <div className={`mobile-sidenav ${isSidebarOpen ? "nav-visible" : ""}`}>
            <div className="app-nav">
                <div className="navcontent">
                    <div className="sidebar-container">
                        <div className="profile-section">
                            <div className="sidebar-close">
                                <button type="button" className="sidebar-close-btn" onClick={() => dispatch(toggleSidebar(false))}>
                                    <HiMiniXMark />
                                </button>
                            </div>
                            <div className="sidebar-user-img">
                                <HiUser />
                            </div>
                            <div className="sidebar-user-name">
                              <NavLink className="sidebar-drpdwn-link userprofile" to="/profile" onClick={() => dispatch(toggleSidebar(false))}>
                                <span>{fullName ? fullName : "FabThread User"}</span>
                                <HiMiniChevronRight />
                              </NavLink>
                            </div>
                        </div>
                        <div className="navUl-section">
                            <ul className="nav__list">
                                <li className="nav__item">
                                  <button className="nav__btn nav__btn--add-recipe" onClick={() => {navigate("/men"); dispatch(toggleSidebar(false))}}>
                                    <span>Men</span>
                                    <HiMiniChevronRight />
                                  </button>
                                </li>
                                <li className="nav__item">
                                  <button className="nav__btn nav__btn--bookmarks" onClick={() => {navigate("/women"); dispatch(toggleSidebar(false))}}>
                                    <span>Women</span>
                                    <HiMiniChevronRight />
                                  </button>
                                </li>
                                <li className="nav__item">
                                  <button className="nav__btn nav__btn--bookmarks">
                                    <span>Kids</span>
                                    <HiMiniChevronRight />
                                  </button>
                                </li>
                            </ul>
                        </div>
                        <div className="userSpecific-section">
                            <ul className="nav__list">
                                <li>
                                    <NavLink className="drpdwn-link userOrders" to="orders" onClick={() => dispatch(toggleSidebar(false))}>
                                      <span>Your Orders</span>
                                    </NavLink>
                                </li>
                                <li>
                                {!isAuthenticated ? (
                                      <NavLink className="drpdwn-link login" to="login" onClick={() => dispatch(toggleSidebar(false))}>Login</NavLink>
                                    ) : (
                                      <NavLink onClick={() => {logout(); dispatch(toggleSidebar(false))}} className="drpdwn-link logout">
                                        <span>Logout</span>
                                        {userLoggingOut && <SpinnerMini />}
                                      </NavLink>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidebarNav
