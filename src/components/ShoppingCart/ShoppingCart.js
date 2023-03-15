import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

import Backdrop from "../UI/Backdrop";
import CartItem from "./CartItem";

import styles from "./ShoppingCart.module.css";

const ShoppingCart = () => {
  function closeCart() {
    document.getElementById("myShoppingCart").style.width = "0";
    document.body.style.backgroundColor = "white";
    dispatch(uiActions.closeCart());
  }

  const dispatch = useDispatch();

  const resetSelector = () => {
    closeCart();
    dispatch(uiActions.changePage("checkout-page"));
  };

  const showCart = useSelector((state) => state.ui.showCart);
  const itemCart = useSelector((state) => state.cart.items);
  const itemCartData = useSelector((state) => state.cart.itemsData);

  // console.log(itemCartData)
  let totalPrice = 0;
  itemCart?.map(item => {
    const existedCartItem = itemCartData.find(
      (itemData) => itemData.idProductOption === item.idProductOption
    );
    if(existedCartItem){
      totalPrice = totalPrice + existedCartItem.price*item.quantity;
    }
    return totalPrice;
  })


  return (
    <React.Fragment>
      <div id="myShoppingCart" className={styles.shoppingCart}>
        <div className={styles.header}>
          <h2>Your Cart</h2>
          <button className={styles.closeCartBtn} onClick={closeCart}>
            <i className="fas fa-times fa-sm"></i>
          </button>
        </div>
        <hr></hr>
        <div className={styles.cartContent}>
          <ul className={styles["cart-items"]}>
            {itemCart?.map((item) => (
              <CartItem
                key={item.idProductOption}
                id={item.idProductOption}
                quantity={item.quantity}
              />
            ))}
          </ul>
          <div className={styles.cartTotal}>
            <div className={styles.totalPrice}>
              Total Price:
              <span className={styles.totalPriceAmount}>
                <bdi>{totalPrice} $</bdi>
              </span>
            </div>
          </div>
          <div className={styles.cartButtonControl}>
            <Link
              to="/checkout"
              className={`btn btn-secondary ${styles.cartButton}`}
              onClick={resetSelector}
            >
              Check out<i className="fas fa-long-arrow-alt-right"></i>
            </Link>
          </div>
        </div>
      </div>
      {showCart && <Backdrop onClick={closeCart} />}
    </React.Fragment>
  );
};

export default ShoppingCart;
