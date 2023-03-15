import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { searchProductActions } from "../../store/searchProduct";
import { uiActions } from "../../store/ui-slice";

import ShoppingCart from "../ShoppingCart/ShoppingCart";
import SidebarPageOption from "./SidebarPageOption";
import Login from "../Login/Login";

import styles from "./ButtonOption.module.css";

const ButtonOption = () => {
  const dispatch = useDispatch();

  const openSidebarPageOption = () => {
    document.getElementById("mySidebarPageOption").style.width = "100%";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  };

  function closeSidebarPageOption() {
    document.getElementById("mySidebarPageOption").style.width = "0";
    document.body.style.backgroundColor = "white";
  }

  const mediaMaxWidth550 = window.matchMedia("(max-width: 550px)");

  function openCart() {
    if (mediaMaxWidth550.matches) {
      document.getElementById("myShoppingCart").style.width = "100%";
    } else {
      document.getElementById("myShoppingCart").style.width = "45%";
    }
    dispatch(uiActions.openCart());
  }

  function openSearchProduct() {
    dispatch(searchProductActions.open());
  }

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const [hasAnimationCart, setHasAnimationCart] = useState(false);

  const buttonCartClass = `nav-link ${styles["nav-option-btn"]} ${
    hasAnimationCart ? styles.bump : ""
  }`;

  const itemCart = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (itemCart.length === 0) {
      return;
    }
    setHasAnimationCart(true);

    const timer = setTimeout(() => {
      setHasAnimationCart(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [itemCart]);

  return (
    <div className={styles["navbar-btn"]}>
      <button
        className={`nav-link ${styles["nav-option-btn"]}`}
        onClick={openSearchProduct}
      >
        <i className="fas fa-search"></i>
      </button>
      <button className={buttonCartClass} onClick={openCart}>
        <i className="fas fa-shopping-cart"></i>
        <span className={styles["cart-quantity"]} aria-hidden="true">
          {totalQuantity}
        </span>
      </button>
      <ShoppingCart />
      <Login btnOptionStyle={styles["nav-option-btn"]} />
      <button
        className={`navbar-toggler`}
        onClick={openSidebarPageOption}
        type="button"
      >
        <i className="fas fa-bars text-white"></i>
      </button>
      <SidebarPageOption onClose={closeSidebarPageOption} />
    </div>
  );
};

export default ButtonOption;
