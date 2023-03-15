import React, { useState, useEffect, useCallback } from "react";

import { useParams } from "react-router-dom";

import useHttp from "../../hook/use-http";

import ProductGallery from "./ProductGallery";
import ProductDetailInformation from "./ProductDetailInformation";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import styles from "./ProductDetail.module.css";

const NotFound = React.lazy(() => import("../../pages/NotFound/NotFound"));

const ProductDetail = () => {
  const params = useParams();

  const [productDetail, setProductDetail] = useState({});
  const {
    isLoading: isLoadingProductDetail,
    error: productDetailHasError,
    sendRequest: fetchProductDetail,
  } = useHttp();

  const transformedProductDetail = useCallback((productDetail) => {
    // console.log(productDetail);
    const loadedProductDetail = {
      id: productDetail.id,
      name: productDetail.name,
      price: productDetail.price,
      category: productDetail.category.name,
      brand: productDetail.brand.name,
      description: productDetail.desc,
      isHot: productDetail.hot === 1,
      sale: productDetail.saleOff,
      priceAfterSale: productDetail.priceAfterSale,
      images: productDetail.images,
      optionSize: productDetail.productOptions,
    };

    setProductDetail(loadedProductDetail);
  }, []);

  // console.log(productDetail);

  const fetchProductDetailHandler = useCallback(() => {
    const requestConfig = {
      url: `/api/product/${params.productId}`,
    };
    fetchProductDetail(requestConfig, transformedProductDetail);
  }, [fetchProductDetail, transformedProductDetail, params.productId]);

  useEffect(() => {
    fetchProductDetailHandler();
  }, [fetchProductDetailHandler]);

  let productContent;

  if (isLoadingProductDetail) {
    productContent = <LoadingSpinner />;
  }

  if (productDetailHasError) {
    productContent = <NotFound />;
  }

  if (!isLoadingProductDetail && !productDetailHasError) {
    if (Object.entries(productDetail).length !== 0) {
      productContent = (
        <div className={`row ${styles["scale-single"]}`}>
          <div className="col-md-6">
            <ProductGallery
              images={productDetail.images}
              isHot={productDetail.isHot}
              sale={productDetail.sale}
            />
          </div>
          <div className="col-md-6">
            <ProductDetailInformation
              name={productDetail.name}
              description={productDetail.description}
              price={productDetail.price}
              sale={productDetail.sale}
              priceAfterSale={productDetail.priceAfterSale}
              category={productDetail.category}
              optionSize={productDetail.optionSize}
            />
          </div>
        </div>
      );
    }
  }

  return (
    <div className={styles.content}>
      <div className={`container ${styles["container-style"]}`}>
        <div className={styles["product-detail"]}>{productContent}</div>
      </div>
    </div>
  );
};

export default ProductDetail;
