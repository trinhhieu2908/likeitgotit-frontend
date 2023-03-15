import SupportItem from "./SupportItem";

import styles from "./Support.module.css";

import SupportShipImage from '../../assets/imageShopSupport/support-1.png'
import Support247Image from '../../assets/imageShopSupport/support-2.png'
import SupportCheapImage from '../../assets/imageShopSupport/support-3.png'
import SupportVoucherImage from '../../assets/imageShopSupport/support-4.png'

const Support = () => {
  return (
    <div className={styles.area}>
      <div className="container">
        <div className="row">
          <SupportItem
            image={SupportShipImage}
            title="Free Shipping"
            description="Free shipping on all orders"
          />
          <SupportItem
            image={Support247Image}
            title="Support 24/7"
            description="Free shipping on all orders"
          />
          <SupportItem
            image={SupportCheapImage}
            title="Cheap product"
            description="Free shipping on all orders"
          />
          <SupportItem
            image={SupportVoucherImage}
            title="Voucher"
            description="Free shipping on all orders"
          />
        </div>
      </div>
    </div>
  );
};

export default Support;
