import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ImageSliderItem from "./ImageSliderItem";

import BagsBanner from "../../assets/Background/BagsBanner.PNG";
import HoodieBanner from "../../assets/Background/HoodiesBanner.png";
import PantsBanner from "../../assets/Background/PantsBanner.png";
import TeeBanner from "../../assets/Background/TeeBanner.png";
import ShoesBanner from "../../assets/Background/ShoesBanner.png";

import styles from "./ImageSlider.module.css";
import "./SlickSlider.css";

const ImageSlider = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    adaptiveHeight: true,
    fade: true,
  };
  return (
    <div className={`carousel ${styles.bodySlider}`}>
      <h1 className={styles["slider-title"]}>Popular</h1>
      <Slider {...settings}>
        <ImageSliderItem image={HoodieBanner} name="hoodie" category="5" />
        <ImageSliderItem image={TeeBanner} name="Tees" category="1" />
        <ImageSliderItem image={PantsBanner} name="pants" category="3" />
        <ImageSliderItem image={ShoesBanner} name="shoes" category="7" />
        <ImageSliderItem image={BagsBanner} name="accessories" category="8" />
      </Slider>
    </div>
  );
};

export default ImageSlider;
