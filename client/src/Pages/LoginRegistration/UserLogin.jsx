import styles from "./UserLogin.module.css";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import logo from "../../images/Logo.png";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate(); // ✅ for redirect after login

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

      // ✅ Store user in localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Redirect to home or any page
      navigate("/");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || "Server error"));
      console.error(err);
    }
  };

  return (
    <form className={styles.login_form} onSubmit={handleSubmit}>
      <div className={styles.form_fields}>
        <img src={logo} alt="Logo" className={styles.form_logo} />
        <h2>User Login</h2>

        <div className={styles.form_item}>
          <label htmlFor="user_name">User Name</label>
          <input
            type="text"
            id="user_name"
            name="username"
            onChange={handleChange}
            autoComplete="username"
            required
          />
        </div>

        <div className={styles.form_item}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
        </div>

        <div className={styles.Admin_btn}>
          <Button text="Login" type="submit" />
        </div>

        <div className={styles.Link}>
          <Link to="/registration">
            <p>New user? Register now..</p>
          </Link>
          <p>
            Forgot your password? <Link to="/forgot-password">Reset here</Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default UserLogin;
