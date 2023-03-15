import Card from "../UI/Card";

import styles from "./FormLogin.module.css";

const FormLogin = () => {
  return (
    <Card restyle=''>
      <form className={styles.form}>
        <div className={styles.control}>
          <label htmlFor="name">Email</label>
          <input type="email" id="username" />
        </div>
        <div className={styles.control}>
          <label htmlFor="name">Password</label>
          <input type="password" id="password" />
        </div>
        <div className={styles.actions}>
          <button className={styles.submit}>Login</button>
        </div>
      </form>
    </Card>
  );
};

export default FormLogin;
