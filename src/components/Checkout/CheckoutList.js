import { useSelector } from "react-redux";

import styles from "./CheckoutList.module.css";

import CheckoutProductItem from "./CheckoutProductItem";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const CheckoutList = () => {
  const itemCart = useSelector((state) => state.cart.items);
  const itemCartData = useSelector((state) => state.cart.itemsData);

  let totalPrice = 0;

  const listCart = itemCart.map((item) => {
    const existedCartItem = itemCartData.find(
      (itemData) => itemData.idProductOption === item.idProductOption
    );
    if (existedCartItem) {
      totalPrice = totalPrice + existedCartItem.price*item.quantity;
      const subtotal = existedCartItem.price * item.quantity;
      return (
        <CheckoutProductItem
          key={item.idProductOption}
          name={existedCartItem.name}
          type={existedCartItem.size}
          price={existedCartItem.price}
          image={existedCartItem.image}
          quantity={item.quantity}
          totalPrice={subtotal}
        />
      );
    }
    return <tr key={item.idProductOption}><td><LoadingSpinner /></td></tr>
  });

  return (
    <div className={styles.list}>
      <div className={styles.content}>
        <h2>Your order</h2>
        <hr></hr>
        <div className={styles.overflow}>
          <table className={styles["product-table"]}>
            <tbody>{listCart}</tbody>
          </table>
        </div>
        <hr></hr>
        <div className={styles.total}>
          <div className={styles.totalPrice}>
            Subtotal:
            <span className={styles.totalPriceAmount}>
              <bdi>{totalPrice} $</bdi>
            </span>
          </div>
          <div className={styles.totalShipping}>
            Shipping:
            <span className={styles.shipping}>
              <bdi>—</bdi>
            </span>
          </div>
        </div>
        <hr></hr>
        <div className={styles.total}>
          <div className={styles.totalPrice}>
            Total:
            <span className={styles.totalPriceAmount}>
              <bdi>{totalPrice} $</bdi>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutList;
