import React, { useEffect } from "react";
import styles from "./Navbar.module.css";
import $ from "jquery";

import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

import PageOption from "./PageOption";
import ButtonOption from "./ButtonOption";
import NavLogo from "./NavLogo";
import SearchProduct from "../SearchProduct/SearchProduct";

const Navbar = () => {
  const dispatch = useDispatch();

  const resetSelector = (page) => {
    dispatch(uiActions.changePage(page.target.id));
  };

  useEffect(() => {
    dispatch(uiActions.runAnimation());
    $(window).on("resize", function () {
      setTimeout(function () {
        dispatch(uiActions.runAnimation());
      }, 500);
    });
  }, [dispatch]);

  return (
    <React.Fragment>
      <nav
        className={`navbar navbar-expand-lg ${styles["navbar-mainBackGround"]}`}
      >
        <NavLogo />
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className={styles.navbarPageContent} id="navbarPageContent">
            <ul className="navbar-nav ml-auto">
              <div className={styles["page-selector"]} id="page-selector">
                <div className={styles.left}></div>
                <div className={styles.right}></div>
              </div>
              <PageOption onClose={resetSelector} />
            </ul>
          </div>
        </div>
        <ButtonOption />
      </nav>
      <SearchProduct />
    </React.Fragment>
  );
};
export default Navbar;
