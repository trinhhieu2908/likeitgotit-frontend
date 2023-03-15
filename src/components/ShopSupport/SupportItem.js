import React, { useState, useEffect } from "react";

import styles from "./SupportItem.module.css";

const SupportItem = (props) => {
  const [isHover, setIsHover] = useState(false);
  const [hasAnimation, setHasAnimation] = useState(false);

  const imgClass = `${styles.itemAnimated} ${hasAnimation ? styles.bump : ""}`;

  const animationIconHandler = () => {
    setIsHover(true);
  };

  useEffect(() => {
    if (isHover) {
      setHasAnimation(true);
      setIsHover(false);
    }
    const timer = setTimeout(() => {
        setHasAnimation(false);
    },300)

    return () => {
        clearTimeout(timer);
    }
  },[isHover]);

  return (
    <div className="col-lg-3 col-sm-6" onMouseOver={animationIconHandler}>
      <div className={styles.supportItem}>
        <div className={styles.itemIcon}>
          <img className={imgClass} src={props.image} alt="support-item" />
        </div>
        <div className={styles.itemContent}>
          <h5>{props.title}</h5>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SupportItem;
