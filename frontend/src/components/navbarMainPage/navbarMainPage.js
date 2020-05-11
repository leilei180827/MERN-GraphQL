import React from "react";
import { NavLink } from "react-router-dom";
import "./navbarMainPage.css";
import AuthContext from "../../context/authContext";
const NavbarMainPage = () => (
  <AuthContext.Consumer>
    {(value) => {
      return (
        <div className="navbarMainPage">
          <div className="navbarLogo">EasyEvent</div>
          <div className="navbarItems">
            <ul>
              {!value.token && (
                <li>
                  <NavLink to="/auth">Authentication</NavLink>
                </li>
              )}
              <li>
                <NavLink to="/events">Events</NavLink>
              </li>
              {value.token && (
                <React.Fragment>
                  <li>
                    <NavLink to="/bookings">Bookings</NavLink>
                  </li>
                  <li>
                    <button onClick={value.logout}>Logout</button>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      );
    }}
  </AuthContext.Consumer>
);
export default NavbarMainPage;
