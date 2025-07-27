import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./LoginChoice.module.css";
import { RiAdminFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";

const LoginChoice = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.login_choice_container}>
      <div className={styles.login_section}>
        <Link to="/admin-login" className={`${styles.login_option} ${styles.admin}`}>
          <h2><RiAdminFill fontSize={24} /> Admin Login</h2>
          <p>Access the admin dashboard and manage data.</p>
        </Link>
      </div>

      <div className={styles.vertical_line}></div>

      <div className={styles.login_section}>
        <Link to="/user-login" className={`${styles.login_option} ${styles.user}`}>
          <h2><FaUserCircle fontSize={24} /> User Login</h2>
          <p>Login as a user to access your profile and features.</p>
        </Link>
      </div>
    </div>
  );
};

export default LoginChoice;
