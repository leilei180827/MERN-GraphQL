import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";
const NavbarMainPage = () => {
  return (
    <div className={styles.navbarMainPage}>
      <div className={styles.navbarLogo}>EasyEvent</div>
      <div className={styles.navbarItems}>
        <ul>
          <li>
            <NavLink to="/auth">Authentication</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li>
            <NavLink to="/bookings">Bookings</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default NavbarMainPage;
