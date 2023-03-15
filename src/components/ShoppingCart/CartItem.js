import React, { useState, useEffect, useCallback } from "react";

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";

import useHttp from "../../hook/use-http";

import LoadingSpinner from '../../components/UI/LoadingSpinner'

import styles from "./CartItem.module.css";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const [cartItem, setCartItem] = useState({});

  const {
    isLoading: isLoadingCartItem,
    error: cartItemHasError,
    sendRequest: fetchCartItem,
  } = useHttp();

  const transformedCartItem = useCallback((data) => {
    // console.log(data);
    const loadedCartItem = {
      idProductOption: parseInt(data.productOption.id),
      idProduct: data.id,
      name: data.name,
      price: data.priceAfterSale,
      image: data.images[0].url,
      size: data.productOption.size.name,
    };

    setCartItem(loadedCartItem);
  }, []);

  const fetchCartItemHandler = useCallback(() => {
    const requestConfig = {
      url: `/api/product-option/${props.id}`,
    };
    fetchCartItem(requestConfig, transformedCartItem);
  }, [fetchCartItem, transformedCartItem, props.id]);

  useEffect(() => {
    fetchCartItemHandler();
  }, [fetchCartItemHandler]);

  useEffect(() => {
    if (Object.entries(cartItem).length !== 0) {
      dispatch(cartActions.loadItemData({ item: cartItem }));
    }
  }, [cartItem,dispatch]);

  const addToCartHandler = (event) => {
    event.preventDefault();
    dispatch(
      cartActions.addItemToCart({
        item: { idProductOption: props.id, quantity: 1 },
      })
    );
  };

  const removeFromCartHandler = (event) => {
    event.preventDefault();
    dispatch(cartActions.removeItemFromCart({ idProductOption: props.id }));
  };

  const clearItemInCartHandler = (event) => {
    event.preventDefault();
    dispatch(
      cartActions.clearItemInCart({
        idProductOption: props.id,
        quantity: props.quantity,
      })
    );
  };

  // console.log(cartItem)
  let content;
  if(isLoadingCartItem){
    content = <LoadingSpinner />
  }

  if (cartItemHasError) {
    localStorage.removeItem('cart')
    content = <p>{cartItemHasError}</p>;
  }

  if(!isLoadingCartItem && !cartItemHasError) {
    content = <img src={cartItem.image} alt="A product" />
  }

  return (
    <li className={styles["cart-item"]}>
      <div className={styles["cart-item-info"]}>
        {content}
        <div className={styles.header}>
          <h2>{cartItem.name}</h2>
          <h3>Size: {cartItem.size}</h3>
          <div className={styles.summary}>
            <span className={styles.price}>{cartItem.price}</span>
            <button onClick={removeFromCartHandler}>−</button>
            <span className={styles.amount}>x {props.quantity}</span>
            <button onClick={addToCartHandler}>+</button>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={clearItemInCartHandler}>x</button>
      </div>
    </li>
  );
};

export default CartItem;
