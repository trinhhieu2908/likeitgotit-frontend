import React from "react";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { searchProductActions } from "../../store/searchProduct";

import FormSearchProduct from "./FormSearchProduct";
import Backdrop from "../UI/Backdrop";

import styles from "./SearchProduct.module.css";

const SearchProduct = () => {
  const showProduct = useSelector(
    (state) => state.searchProduct.showSearchProduct
  );

  const dispatch = useDispatch();

  const history = useHistory();

  const CloseSearchProduct = () => {
    dispatch(searchProductActions.close());
  };

  const searchProductHandler = (text) => {
    // console.log(text);

    history.push(`/shop/products?search=${text}`);
  };

  return (
    <div className={styles.search} id="search-product">
      <FormSearchProduct
        cardRestyle={styles.cardStyle}
        onSubmitSearchProduct={searchProductHandler}
      />
      {showProduct && <Backdrop onClick={CloseSearchProduct} />}
    </div>
  );
};

export default SearchProduct;
