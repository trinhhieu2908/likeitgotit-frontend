import React from "react";

import ImageSlider from "../../components/Slider/ImageSlider";
import ImageContent from "../../components/Home/ImageContent";

import homepageImage1 from "../../assets/Background/homepageImage1.png";
import homepageImage2 from "../../assets/Background/homepageImage2.png";

const Home = () => {
  return (
    <React.Fragment>
      <ImageSlider />
      <ImageContent image={homepageImage1} />
      <ImageContent image={homepageImage2} />
    </React.Fragment>
  );
};
export default Home;
