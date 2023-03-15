import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { uiActions } from "../../store/ui-slice";

import { v4 as uuidV4 } from "uuid";

import { cartActions } from "../../store/cart";

import styles from "./CheckoutContent.module.css";

import useHttp from "../../hook/use-http";

import CheckoutList from "./CheckoutList";
import OrderInfo from "./OrderInfo";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const CheckoutContent = () => {
  const dispatch = useDispatch();

  const [submittingSuccess, setSubmittingSuccess] = useState(false);

  const itemCart = useSelector((state) => state.cart.items);
  const itemCartData = useSelector((state) => state.cart.itemsData);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const {
    isLoading: isSubmitting,
    error: submittingNotSuccess,
    sendRequest: fetchSubmitOrder,
  } = useHttp();

  const uuid = uuidV4();

  let totalPrice = 0;

  const itemsInOrder = itemCart.map((item) => {
    const existedCartItem = itemCartData.find(
      (itemData) => itemData.idProductOption === item.idProductOption
    );
    let itemInOrder = {};
    if (existedCartItem) {
      totalPrice = totalPrice + existedCartItem.price * item.quantity;
      const subtotal = existedCartItem.price * item.quantity;
      itemInOrder = {
        idOrder: uuid,
        idProductOption: item.idProductOption,
        price: existedCartItem.price,
        quantity: item.quantity,
        subtotal: subtotal,
      };
    }
    return itemInOrder;
  });

  const submitOrderHandler = (customerInfo) => {
    const order = {
      id: uuid,
      emailCustomer: customerInfo.email,
      numberOfProduct: totalQuantity,
      totalPrice: totalPrice,
      fullName: customerInfo.name,
      productDetail: itemsInOrder,
    };
    // console.log(order);
    const requestConfigSubmitOrder = {
      url: "/api/order",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: order,
    };
    fetchSubmitOrder(requestConfigSubmitOrder);
    if (!submittingNotSuccess) {
      setSubmittingSuccess(true);
    } else {
      setSubmittingSuccess(false);
    }

    dispatch(cartActions.clearCart());
  };

  const resetSelector = () => {
    dispatch(uiActions.changePage("shop-page"));
  };

  let OrderContent;

  if (itemCart.length === 0) {
    OrderContent = (
      <div className={styles.handle}>
        <p className={styles.text}>There is no product in cart</p>
        <Link to="/shop/products" className={styles.textShop} onClick={resetSelector}>
          Click here to go to shop
        </Link>
      </div>
    );
  }
  if (itemCart.length > 0) {
    OrderContent = (
      <div className={styles.checkout}>
        <CheckoutList />
        <OrderInfo onSendOrder={submitOrderHandler} />
      </div>
    );
  }

  let content = OrderContent;

  if (!isSubmitting && !submittingSuccess) {
    content = OrderContent;
  }

  if (isSubmitting) {
    content = (
      <div className={styles.handle}>
        <p className={styles.text}>Sending order data...</p>
        <LoadingSpinner />
      </div>
    );
  }

  if (!isSubmitting && submittingSuccess) {
    content = (
      <div className={styles.handle}>
        <p className={styles.text}>Your order has been send successfully</p>
        <Link to="/shop/products" className={styles.textShop} onClick={resetSelector}>
          Click here to back to shop
        </Link>
      </div>
    );
  }

  return <React.Fragment>{content}</React.Fragment>;
};

export default CheckoutContent;
