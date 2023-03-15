import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import useHttp from "../../hook/use-http";

import backgroundImage from "../../assets/Background/backgroundCategory.gif";

import styles from "./MostPopular.module.css";


const MostPopular = () => {
  const [listCategory, setListCategory] = useState([]);

  const {
    // isLoading: isLoadingCategory,
    // error: loadedCategoryHasError,
    sendRequest: fetchCategory,
  } = useHttp();

  const transformedListCategory = useCallback((listData) => {
    setListCategory(listData);
  }, []);

  const fetchCategoryHandler = useCallback(() => {
    const requestConfig = {
      url: "/api/category",
    };
    fetchCategory(requestConfig, transformedListCategory);
  }, [fetchCategory, transformedListCategory]);

  useEffect(() => {
    fetchCategoryHandler();
  }, [fetchCategoryHandler]);
  return (
    <div className={styles.banner}>
      <div className={styles.bannerImage}>
        <img src={backgroundImage} alt="banner-img" />
        <div className={styles.bannerList}>
          <h2>PRODUCTS</h2>
          <ul>
            {listCategory?.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/shop/products?category=${category.id}`}
                  className={styles.button}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MostPopular;
