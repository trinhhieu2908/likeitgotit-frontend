import styles from "./ContactContent.module.css";
import Card from "../UI/Card";

const ContactContent = () => {
  return (
    <div className={`container ${styles.content}`}>
      <h1>How To Contact Us</h1>
      <div className={styles.contact}>
        <Card restyle={styles["card-restyle-fb"]}>
          <div className={styles.section}>
            <h2>Facebook</h2>
            <a
              href="https://www.facebook.com/hieu29082000"
              className={styles["icon-fb"]}
            >
              <i className="fab fa-facebook-square"></i>
              Trịnh Hiếu
            </a>
            <br></br>
            <a
              href="https://www.facebook.com/chuong.thuy.duong.2011"
              className={styles["icon-fb"]}
            >
              <i className="fab fa-facebook-square"></i>
              Dương Thụy Chương
            </a>
          </div>
        </Card>
        <br></br>
        <br></br>
        <br></br>
        <Card restyle={styles["card-restyle-inst"]}>
          <div className={styles.section}>
            <h2>Instagram</h2>
            <a
              href="https://www.instagram.com/_trinh_hieu_/"
              className={styles["icon-inst"]}
            >
              <i className="fab fa-instagram"></i>
              _trinh_hieu_
            </a>
            <br></br>
            <a
              href="https://www.facebook.com/chuong.thuy.duong.2011"
              className={styles["icon-inst"]}
            >
              <i className="fab fa-instagram"></i>
              Dương Thụy Chương
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContactContent;
