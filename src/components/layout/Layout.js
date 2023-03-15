import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { cartActions } from "../../store/cart";

import Navbar from "../Navbar/Navbar";

import styles from "./Layout.module.css";

let initial = true;

const Layout = (props) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData !== null) {
      dispatch(
        cartActions.replaceCartData({
          items: cartData.items,
          totalQuantity: cartData.totalQuantity,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    const cartStore = {items: cart.items, totalQuantity: cart.totalQuantity};
    localStorage.setItem("cart", JSON.stringify(cartStore));
  }, [cart]);
  return (
    <React.Fragment>
      <Navbar />
      <main className={styles.main}>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
