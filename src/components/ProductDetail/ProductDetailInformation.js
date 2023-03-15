import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";

import styles from "./ProductDetailInformation.module.css";

const ProductDetailInformation = (props) => {
  const dispatch = useDispatch();

  const [idProductOption, setIdProductOption] = useState("");

  const selectSizeHandler = (event) => {
    setIdProductOption(event.target.value);
  };

  let selectValid = false;

  if (idProductOption !== "") {
    selectValid = true;
  }

  const classButtonAddToCart = `${styles.btnProduct} ${
    !selectValid && styles.btnDisable
  }`;

  const addToCartHandler = (event) => {
    event.preventDefault();
    // console.log(idProductOption);
    dispatch(
      cartActions.addItemToCart({
        item: { idProductOption: parseInt(idProductOption), quantity: 1 },
      })
    );
  };

  const priceNoSaleClasses =
    props.sale !== 0 ? styles["product-price-no-sale"] : "";

  return (
    <div className={styles["product-details"]}>
      <h1>{props.name}</h1>
      <div className={styles["product-price"]}>
        <div className={priceNoSaleClasses}>{props.price}$</div>
        {props.sale !== 0 && (
          <div className={styles["product-price-sale"]}>
            {props.priceAfterSale}$
          </div>
        )}
      </div>
      <div className={styles["product-description"]}>
        <p>{props.description}</p>
      </div>
      <div className={styles["product-size"]}>
        <label htmlFor="product-size">Size: </label>
        <div className={styles["selected-custom"]}>
          <select
            name="product-size"
            className={`form-control ${styles["select-form"]}`}
            value={idProductOption}
            onChange={selectSizeHandler}
          >
            <option value="">Select a size</option>
            {props.optionSize?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.size.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles["product-details-action"]}>
        <button
          disabled={!selectValid}
          className={classButtonAddToCart}
          onClick={addToCartHandler}
        >
          <i className="fas fa-cart-plus"></i>
          ADD TO CART
        </button>
      </div>
      <div className={styles["product-details-footer"]}>
        <div className={styles["product-details-footer-category"]}>
          <span>Category: </span>
          <span>{props.category}</span>
        </div>
        <div className={styles["social-icons"]}>
          <span>Share: </span>
          <a href="https://www.facebook.com/" className={styles["social-icon"]}>
            <i className="fab fa-facebook-f fa-xs"></i>
          </a>
          <a
            href="https://www.instagram.com/"
            className={styles["social-icon"]}
          >
            <i className="fab fa-instagram fa-xs"></i>
          </a>
          <a
            href="https://www.messenger.com/"
            className={styles["social-icon"]}
          >
            <i className="fab fa-facebook-messenger fa-xs"></i>
          </a>
          <a href="https://twitter.com/" className={styles["social-icon"]}>
            <i className="fab fa-twitter fa-xs"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailInformation;
