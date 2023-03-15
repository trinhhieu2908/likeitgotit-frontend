import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { listProductsActions } from "../../store/list-products";

import ProductItem from "./ProductItem";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import useHttp from "../../hook/use-http";

import styles from "./ListProduct.module.css";

const limitLoad = 12;

const ListProduct = (props) => {
  const dispatch = useDispatch();

  const moreProductDisabled = useSelector(
    (state) => state.listProducts.moreProductDisabled
  );

  const skipIndex = useSelector((state) => state.listProducts.skipIndex);

  // console.log(props.search);
  const {
    isLoading: isLoadingMoreProduct,
    error: moreProductHasError,
    sendRequest: fetchProductMoreData,
  } = useHttp();

  const transformedProductMoreData = useCallback(
    (productData) => {
      if (productData.length < limitLoad) {
        dispatch(listProductsActions.enableMoreButton());
      }
      // console.log(productData.length);
      const loadedMoreProduct = [];
      // console.log(productData);
      if (productData != null) {
        for (let i = 0; i < productData.length; i++) {
          loadedMoreProduct.push({
            id: productData[i].id,
            name: productData[i].name,
            price: productData[i].price,
            category: productData[i].category.name,
            brand: productData[i].brand.name,
            description: productData[i].desc,
            isHot: productData[i].hot === 1,
            sale: productData[i].saleOff,
            priceAfterSale: productData[i].priceAfterSale,
            image1: productData[i].images[0].url,
            image2: productData[i].images[1].url,
            optionSize: productData[i].productOptions,
          });
        }
      }
      dispatch(
        listProductsActions.loadedMoreProduct({
          productsMoreData: loadedMoreProduct,
        })
      );
    },
    [dispatch]
  );

  const moreProductHandler = () => {
    console.log("index skip", skipIndex);
    console.log(props.listProducts)
    let urlFetchProductData;
    if (props.category === null && props.search === null) {
      urlFetchProductData = `/api/product?skip=${
        skipIndex * limitLoad
      }&limit=${limitLoad}`;
    } else if (props.category && props.search === null) {
      urlFetchProductData = `/api/product-category/${props.category}?skip=${
        skipIndex * limitLoad
      }&limit=${limitLoad}`;
    } else if (props.search && props.category === null) {
      urlFetchProductData = `/api/product?search=${props.search}&skip=${
        skipIndex * limitLoad
      }&limit=${limitLoad}`;
    }
    const requestConfigSubmitOrder = {
      url: urlFetchProductData,
    };
    fetchProductMoreData(requestConfigSubmitOrder, transformedProductMoreData);
    dispatch(listProductsActions.increaseSkipIndex());
    
  };

  let moreProductContent;

  if (isLoadingMoreProduct) {
    moreProductContent = <LoadingSpinner />;
  }

  if (moreProductHasError) {
    moreProductContent = <p>{moreProductHasError}</p>;
  }
  return (
    <div className={styles.content}>
      <div className={`container ${styles.containerStyle}`}>
        <div className={styles.products}>
          <div className="row">
            {props.listProducts.map((product) => (
              <ProductItem
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                category={product.category}
                brand={product.brand}
                isHot={product.isHot}
                sale={product.sale}
                priceAfterSale={product.priceAfterSale}
                image1={product.image1}
                image2={product.image2}
                optionSize={product.optionSize}
              />
            ))}
          </div>
        </div>
        {moreProductContent}
        {!moreProductDisabled && (
          <div className={styles["load-more"]}>
            <button
              className={styles["btn-load-more"]}
              onClick={moreProductHandler}
            >
              More Products<i className="fas fa-search-plus"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
