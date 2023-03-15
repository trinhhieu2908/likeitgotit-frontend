import React from 'react';
import { NavLink } from "react-router-dom";

import styles from './NavLogo.module.css'

const NavLogo = () => {
  return (
    <NavLink className={`navbar-brand ${styles["navbar-logo"]}`} to="/" exact>
      Like it, Got it
    </NavLink>
  );
};

export default React.memo(NavLogo);
