import { useState, useEffect } from "react";
import $ from "jquery";

import styles from "./ProductGallery.module.css";

const ProductGallery = (props) => {
  const firstImage = props.images[0].url;

  const [isHold, setIsHold] = useState(false);
  const [imageSelect, setImageSelect] = useState(firstImage);

  const holdImageHandler = () => {
    setIsHold(true);
  };
  const stopHoldImageHandler = () => {
    setIsHold(false);
  };

  const removeActiveStyle = () => {
    var tabsButton = $("#button-product-image-gallery");
    var activeButton = tabsButton.find(".active");
    const idActive = activeButton.attr("id");
    if (idActive !== undefined) {
      $(`#${idActive}`).css({
        border: "1px solid rgb(143, 143, 143)",
        opacity: "0.7",
      });
      $(`#${idActive}`).removeClass("active");
    }
  };

  const selectImageHandler = (event) => {
    setImageSelect(event.target.src);
    removeActiveStyle();
    const id = event.target.id;
    $(`#${id}`).addClass("active");
    $(`#${id}`).css({
      border: "1px solid #31dd25",
      opacity: "1",
    });
  };

  const moveImageHandler = (event) => {
    var image = document.getElementById("image-main");
    let rect = event.target.getBoundingClientRect();
    var x = -event.clientX + rect.left + (image.offsetWidth - 400);
    var y = -event.clientY + rect.top;
    $("#image-magnifying-move").css({
      transform: `translate(${x}px ,${y}px)`,
    });
  };

  useEffect(() => {
    var image = document.getElementById("image-main");
    $("#div-image-magnifying-move").css({
      height: `${image.offsetHeight}px`,
      width: `${image.offsetWidth}px`,
    });
    $(window).on("resize", function () {
      setTimeout(function () {
        $("#div-image-magnifying-move").css({
          height: `${image.offsetHeight}px`,
          width: `${image.offsetWidth}px`,
        });
      }, 300);
    });
    $("#product-gallery-item-image-0").addClass("active");
    $("#product-gallery-item-image-0").css({
      border: "1px solid #31dd25",
      opacity: "1",
    });
  }, []);

  const imageContentClasses = `${styles["image-content"]} ${
    isHold ? styles["image-content-hold"] : " "
  }`;
  const imageMagnifyingClasses = `${styles["image-magnifying"]} ${
    isHold ? styles["image-magnifying-hold"] : ""
  }`;

  const classSaleLabel = `${styles.productLabel} ${styles.productLabelSale} ${props.isHot ? "" : styles.productLabelSaleNoHot}`

  return (
    <div className={styles["product-gallery"]}>
      <div className={`row m-0 ${styles["row-product-gallery"]}`}>
        <figure className={styles["product-main-image"]}>
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
          <div className={styles["zoom-image"]}>
            <div
              className={imageContentClasses}
              onMouseOver={holdImageHandler}
              onMouseOut={stopHoldImageHandler}
              onMouseMove={moveImageHandler}
            >
              <img id="image-main" src={imageSelect} alt="product" />
              <div
                className={imageMagnifyingClasses}
                id="div-image-magnifying-move"
              >
                <img
                  id="image-magnifying-move"
                  src={imageSelect}
                  alt="product"
                />
              </div>
            </div>
          </div>
        </figure>
        <div
          className={styles["product-image-gallery"]}
          id="button-product-image-gallery"
        >
          {props.images?.map((image, index) => (
            <button
              key={image.id}
              className={styles["product-gallery-item"]}
              onClick={selectImageHandler}
            >
              <div className={styles["product-gallery-image-wrapper"]}>
                <img
                  src={image.url}
                  alt="product"
                  id={`product-gallery-item-image-${index}`}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
