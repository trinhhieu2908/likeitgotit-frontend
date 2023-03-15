import NavLogo from "../Navbar/NavLogo";

import styles from "./AboutContent.module.css";

import backgroundAbout from "../../assets/Background/backgroundAbout.png";

const AboutContent = () => {
  return (
    <div className={`container ${styles.content}`}>
      <div className={styles.about}>
        <div className={styles.header}>
          <NavLogo />
        </div>
        <br></br>
        <div className={styles.image}>
          <img src={backgroundAbout} alt="about-content" />
        </div>

        <div className={styles.body}>
          <p>This website is created for entertainment purposes.</p>
          <p>Firstly, Dear all brand we use the products</p>
          <p>
            We are using these products for non-profit purposes, just a dummy
            project. Thank you for your support. If you have any problem, please
            contact us.
          </p>
          <p>Secondly, Dear Customer</p>
          <p>
            If you are interested in fashion or clothes, let visit us to choose
            your outfit. There is no selling or buying here, we only create this
            website for fun and for people who want to satisfy their shopping
            hobby but don't want to spend money. We also make this for people
            who want to relax when boring, just visit us click some product and
            checkout.An email thank you will be send to your email, please
            check. Have a nice day.
          </p>
          <hr></hr>
          <br></br>
          <h5>Officer: </h5>
          <p>pending...</p>
          <h5>Stores: </h5>
          <p>pending...</p>
          <h5>Email: </h5>
          <p>likeitgotit@gmail.com</p>
        </div>
      </div>
    </div>
  );
};
export default AboutContent;
