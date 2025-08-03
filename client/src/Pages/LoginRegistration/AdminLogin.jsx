import styles from "./AdminLogin.module.css";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import adminImg from "../../images/Admin_login.png";

import { useState, useEffect } from "react";
import axios from "axios";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    key: "",
    email: "",
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
      const res = await axios.post("/admin-login", formData);
      alert(res.data.message);
      localStorage.setItem("adminUser", JSON.stringify(res.data.user));

    
    window.open("/admin-dashboard", "_blank");
      
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || "Server error"));
      console.error(err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <form className={styles.login_form} onSubmit={handleSubmit}>
      <div className={styles.form_fields}>
        <h2>Admin Login</h2>

        <div className={styles.form_item}>
          <label htmlFor="key">Key</label>
          <input
            type="password"
            id="key"
            name="key"
            value={formData.key}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.form_item}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.form_item}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
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
