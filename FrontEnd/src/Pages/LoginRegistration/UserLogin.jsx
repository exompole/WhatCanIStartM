import styles from "./UserLogin.module.css";
import Button from "../../components/Button";
import userImg from "../../images/UserLogin.png";
import { Link } from "react-router-dom";

const UserLogin = () => {
  return (
    <form className={styles.login_form}>
      <div className={styles.form_fields}>
        <h2>User Login</h2>

        <div className={styles.form_item}>
          <label htmlFor="user_name">User Name </label>
          <input type="text" id="user_name" name="user_name" required />
        </div>

        <div className={styles.form_item}>
          <label htmlFor="user_password">Password </label>
          <input type="password" id="user_password" name="password" required />
        </div>

        <div className={styles.Admin_btn}>
          <Button text="submit">Login</Button>
        </div>
        <Link to="/registration">
          <div>
            <p>New user? Register now..</p>
          </div>
        </Link>
      </div>

      <div className={styles.User_img}>
        <img src={userImg} alt="UserImg" />
      </div>
    </form>
  );
};

export default UserLogin;
