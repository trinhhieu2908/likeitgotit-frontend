import React from "react";
import styles from "./CheckoutProductItem.module.css";

const CheckoutProductItem = (props) => {
  return (
    <tr className={styles.product}>
      <td className={styles["product-image"]}>
        <div className={styles["product-thumbnail"]}>
          <div className={styles["product-thumbnail-wrapper"]}>
            <img src={props.image} alt="A product" />
          </div>
          <span
            className={styles["product-thumbnail-quantity"]}
            aria-hidden="true"
          >
            {props.quantity}
          </span>
        </div>
      </td>
      <td className={styles["product-info"]}>
        <span className={styles["product-info-name"]}>{props.name}</span>
        <span className={styles["product-info-type"]}>Size: {props.type}</span>
        <span className={styles["product-info-type"]}>{props.price}$</span>
      </td>
      <td className={styles["product-price"]}>
        <span className={styles["product-price-number"]}>
          {props.totalPrice}$
        </span>
      </td>
    </tr>
  );
};

export default CheckoutProductItem;
