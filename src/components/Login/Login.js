import React, { useState } from "react";

import FormLogin from "./FormLogin";
import Backdrop from "../UI/Backdrop";

import styles from "./Login.module.css";

const Login = (props) => {
  const [loginOpen, setLoginOpen] = useState(false);

  const classDropDown = `${styles["dropdown-content"]} ${
    loginOpen ? styles.active : ""
  }`;
  function openLogin() {
    setLoginOpen(true);
  }
  function closeLogin() {
    setLoginOpen(false);
  }
  return (
    <div className={styles.dropdown}>
      <button className={`nav-link ${props.btnOptionStyle}`} onClick={openLogin}>
        <i className="fas fa-user"></i>
      </button>
      <div className={classDropDown}>
        <FormLogin />
        {loginOpen && <Backdrop onClick={closeLogin} />}
      </div>
    </div>
  );
};

export default Login;
