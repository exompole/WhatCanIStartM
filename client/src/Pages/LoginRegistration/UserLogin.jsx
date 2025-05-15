import styles from "./UserLogin.module.css";
import Button from "../../components/Button";

import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", formData);
      alert(res.data.message);
      console.log("Logged in user:", res.data.user);
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || "Server error"));
      console.error(err);
    }
  };

  return (
    <form className={styles.login_form} onSubmit={handleSubmit}>
      <div className={styles.form_fields}>
        <h2>User Login</h2>

        <div className={styles.form_item}>
          <label htmlFor="user_name">User Name</label>
          <input
            type="text"
            id="user_name"
            name="username"
            onChange={handleChange}
          />
        </div>

        <div className={styles.form_item}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.Admin_btn}>
          <Button text="submit">Login</Button>
        </div>

        <div className={styles.Link}>
          <Link to="/registration">
            <p>New user? Register now..</p>
          </Link>
        </div>
      </div>

      <div className={styles.typewriter_section}>
        <p className={styles.typewriter}>
          We are so happy to <br />
          have you back...!!!
        </p>
      </div>
    </form>
  );
};

export default UserLogin;
