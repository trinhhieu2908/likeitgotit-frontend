import styles from "./SidebarPageOption.module.css";
import stylesPageContent from "./Navbar.module.css";
import PageOption from "./PageOption";

const SidebarPageOption = (props) => {
  return (
    <div id="mySidebarPageOption" className={styles.sideNav}>
      <div className={stylesPageContent.navbarPageContent}>
        <ul className="navbar-nav ml-auto">
          <PageOption onClose={props.onClose} />
        </ul>
      </div>
      <div className={styles["btn-closeSideNav"]} onClick={props.onClose}>
        <button>
          <i className="fas fa-times"></i>Close
        </button>
      </div>
    </div>
  );
};

export default SidebarPageOption;
