import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";

import styles from "./ProductItem.module.css";

const ProductItem = (props) => {
  const dispatch = useDispatch();

  const [isHover, setIsHover] = useState(false);

  const styleImage = `${styles.productImage} ${styles.lazyLoadImageBg}`;
  const productActionClasses = `${styles.productAction} ${
    isHover ? styles.productActionActive : ""
  }`;

  const hoverHandler = () => {
    setIsHover(true);
  };

  const removerHoverHandler = () => {
    setIsHover(false);
  };

  const addToCartHandler = (event) => {
    event.preventDefault();
    // console.log(props.optionSize[0].id);
    dispatch(
      cartActions.addItemToCart({
        item: { idProductOption: parseInt(props.optionSize[0].id) },
      })
    );
  };

  const priceNoSaleClasses = props.sale !== 0 ? styles.productPriceNoSale : ""

  const classContent = `col-6 col-md-4 col-lg-4 col-xl-3 ${styles.animation}`;
  const classSaleLabel = `${styles.productLabel} ${styles.productLabelSale} ${props.isHot ? "" : styles.productLabelSaleNoHot}`

  return (
    <div className={classContent}>
      <div
        className={styles.product}
        onMouseOver={hoverHandler}
        onMouseOut={removerHoverHandler}
      >
        <figure className={styles.productMedia}>
          {props.isHot && (
            <span
              className={`${styles.productLabel} ${styles.productLabelHot}`}
            >
              Hot
            </span>
          )}
          {props.sale !== 0 && (
            <span
              className={classSaleLabel}
            >
              Sale {props.sale} %
            </span>
          )}
          <Link to={`/shop/detail/${props.id}`}>
            <span className={styleImage}>
              {!isHover && <img alt="product" src={props.image1} />}
              {isHover && <img alt="product" src={props.image2} />}
            </span>
          </Link>
          <div className={productActionClasses}>
            {props.optionSize.length === 1 && (
              <a
                href="/"
                className={styles.btnProduct}
                onClick={addToCartHandler}
              >
                <i className="fas fa-cart-plus"></i>
                add to cart
              </a>
            )}
            {props.optionSize.length > 1 && (
              <Link
                to={`/shop/detail/${props.id}`}
                className={styles.btnProduct}
              >
                <i className="fas fa-list"></i>
                select option
              </Link>
            )}
            <div className={styles.vl}></div>
            <Link to={`/shop/detail/${props.id}`} className={styles.btnProduct}>
              <i className="fas fa-eye"></i>
              view detail
            </Link>
          </div>
        </figure>
        <div className={styles.productBody}>
          <div className={styles.productCategory}>
            {props.category} | {props.brand}
          </div>
          <div className={styles.productTitle}>{props.name}</div>
          <div className={styles.productPrice}>
            <div className={priceNoSaleClasses}>
              {props.price}$
            </div>
            {props.sale !== 0 && (
              <div className={styles.productPriceSale}>
                {props.priceAfterSale}$
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
