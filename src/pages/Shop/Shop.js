import React, { useCallback, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { listProductsActions } from "../../store/list-products";

import useHttp from "../../hook/use-http";

import MostPopular from "../../components/FilterProduct/MostPopular";
import Support from "../../components/ShopSupport/Support";
import ListProduct from "../../components/Products/ListProduct";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

const NotFound = React.lazy(() => import("../../pages/NotFound/NotFound"));

const limitLoad = 12;

const Shop = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const search = queryParams.get("search");  

  const listProductsData = useSelector(
    (state) => state.listProducts.productsData
  );

  const {
    isLoading: isLoadingLoadedProduct,
    error: loadedProductHasError,
    sendRequest: fetchProductData,
  } = useHttp();

  const transformedProductData = useCallback(
    (productData) => {
      const loadedProduct = [];
      // console.log(productData);
      if (productData != null) {
        for (let i = 0; i < productData.length; i++) {
          loadedProduct.push({
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
        listProductsActions.loadListProductData({ productsData: loadedProduct })
      );
    },
    [dispatch]
  );

  const fetchProductDataHandler = useCallback(() => {
    let urlFetchProductData;
    if (category === null && search === null) {
      urlFetchProductData = `/api/product?skip=0&limit=${limitLoad}`;
    } else if (category && search === null) {
      urlFetchProductData = `/api/product-category/${category}?skip=0&limit=${limitLoad}`;
    } else if (search && category === null) {
      urlFetchProductData = `/api/product?search=${search}&skip=0&limit=${limitLoad}`;
    }
    const requestConfigSubmitOrder = {
      url: urlFetchProductData,
    };
    // console.log(urlFetchProductData);
    fetchProductData(requestConfigSubmitOrder, transformedProductData);
  }, [fetchProductData, transformedProductData, category, search]);

  useEffect(() => {
    fetchProductDataHandler();
    dispatch(listProductsActions.resetSkipIndex());
    dispatch(listProductsActions.disableMoreButton());
  }, [fetchProductDataHandler,dispatch]);

  let listProductContent;

  if (isLoadingLoadedProduct) {
    listProductContent = <LoadingSpinner />;
  }

  if (loadedProductHasError) {
    listProductContent = <p>{loadedProductHasError}</p>;
  }

  if (!isLoadingLoadedProduct && !loadedProductHasError) {
    listProductContent = (
      <ListProduct
        category={category}
        search={search}
        listProducts={listProductsData}
      />
    );
  }

  return (
    <React.Fragment>
      <MostPopular />
      <Switch>
        <Route path="/shop" exact>
          <Redirect to="/shop/products" />
        </Route>
        <Route path="/shop/products" exact>
          <Support />
          {listProductContent}
        </Route>
        <Route path="/shop/detail/:productId" exact>
          <ProductDetail />
        </Route>
        <Route path="/shop/*">
          <NotFound />
        </Route>
      </Switch>
    </React.Fragment>
  );
};
export default Shop;
