import styles from "./ImageContent.module.css";

const ImageContent = (props) => {
  
  return (
    <div className={styles.content}>
      <img src={props.image} alt="product" />
    </div>
  );
};

export default ImageContent;
