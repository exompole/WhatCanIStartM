import styles from "./AdminLogin.module.css";
import Button from "../../components/Button";
import adminImg from "../../images/Admin_login.png";

const AdminLogin = () => {
  return (
    <form className={styles.login_form}>
      <div className={styles.form_fields}>
        <h2>Admin Login</h2>
        <div className={styles.form_item}>
          <label htmlFor="admin_key">Key </label>
          <input type="text" id="key" name="key" required />
        </div>
        <div className={styles.form_item}>
          <label htmlFor="admin_email">Email </label>
          <input type="email" id="admin_email" name="email" required />
        </div>
        <div className={styles.form_item}>
          <label htmlFor="admin_password">Password </label>
          <input type="password" id="admin_password" name="password" required />
        </div>
        <div className={styles.Admin_btn}>
          <Button text="submit">Login</Button>
        </div>
      </div>

      <div className={styles.form_image}>
        <img src={adminImg} alt="Admin Login" />
      </div>
    </form>
  );
};

export default AdminLogin;
