import { NavLink } from "react-router-dom"
import { useUser } from "../Authentication/useUser"
import { HiMiniFolderOpen, HiOutlineArrowRightOnRectangle, HiUser } from "react-icons/hi2";
import SpinnerMini from "./SpinnerMini";
import React from "react";
import { useSelector } from "react-redux";
  
const UserProfile = React.memo(function UserProfile({onLogout, userLoggingOut}) {
    const {user} = useSelector((store) => store.cartStates);
    const {fullName, avatar} = user?.user_metadata;

    return (
        <div className="profile-elements">
          {fullName && <NavLink className="drpdwn-link userprofile" to="/profile">
            {/* <img className="profile-img" src={avatar} alt="userImg" /> */}
            <HiUser />
            <span>{fullName}</span>
          </NavLink>}
          <NavLink className="drpdwn-link userOrders" to="orders">
            <HiMiniFolderOpen />
            <span>Your Orders</span>
          </NavLink>
          {!fullName ? (
            <NavLink className="drpdwn-link login" to="login">Login</NavLink>
          ) : (
            <NavLink onClick={() => onLogout()} className="drpdwn-link logout">
              <HiOutlineArrowRightOnRectangle />
              <span>Logout</span>
              {userLoggingOut && <SpinnerMini />}
            </NavLink>
          )}
        </div>
    )
})

export default UserProfile
