import React, { useRef } from "react";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { searchProductActions } from "../../store/searchProduct";
import { uiActions } from "../../store/ui-slice";

import Card from "../UI/Card";

import styles from "./FormSearchProduct.module.css";

const FormSearchProduct = (props) => {
  const textSearchRef = useRef();
  const dispatch = useDispatch();

  const submitSearchProductHandler = (event) => {
    event.preventDefault();

    dispatch(searchProductActions.close());
    dispatch(uiActions.changePage("shop-page"));

    props.onSubmitSearchProduct(textSearchRef.current.value);
    textSearchRef.current.value = "";
  };
  return (
    <Card restyle={props.cardRestyle}>
      <form className={styles.form} onSubmit={submitSearchProductHandler}>
        <p className={styles.title}>Search for products</p>
        <div className={styles.control}>
          <label htmlFor="name"></label>
          <input
            type="text"
            id="search-product"
            placeholder="Type here to search"
            ref={textSearchRef}
          />
        </div>
        <hr className={styles.line} />
      </form>
    </Card>
  );
};

export default FormSearchProduct;
