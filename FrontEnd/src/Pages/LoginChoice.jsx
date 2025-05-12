import { Link } from "react-router-dom";
import styles from "./LoginChoice.module.css";
import Button from "../components/Button";
import { RiAdminFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";


const LoginChoice = () => {
  return (
    <div className={styles.login_choice_container}>
      <div className={styles.login_section}>
        <div className={`${styles.login_option} ${styles.admin}`}>
          <h2>Admin Login</h2>
          <p>Access the admin dashboard and manage data.</p>
        </div>
        <div className={`${styles.login_btn} ${styles.admin_btn}`}>
          <Link to="/admin-login">
            <Button isOutline ={true} icon={<RiAdminFill fontSize={24}/> } text="Go to Admin Login" />
          </Link>
        </div>
      </div>

      <div className={styles.vertical_line}></div>

      <div className={styles.login_section}>
        <div className={`${styles.login_option} ${styles.user}`}>
          <h2>User Login</h2>
          <p>Login as a user to access your profile and features.</p>
        </div>
        <div className={`${styles.login_btn} ${styles.user_btn}`}>
          <Link to="/user-login">
            <Button isOutline ={true} icon={<FaUserCircle fontSize={24}/>} text="Go to User Login" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginChoice;
