import styles from "./Registration.module.css";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await axios.post("http://localhost:5000/api/register", formData);
      setSuccessMessage(res.data.message); 
      setFormData({
        username: "",
        firstname: "",
        surname: "",
        email: "",
        phone: "",
        password: "",
      }); // Clear form fields
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed"); // Handle error response
    }
  };

  return (
    <form className={styles.registration_form} onSubmit={handleSubmit}>
      <div className={styles.form_fields}>
        <h2>User Registration</h2>

        <div className={styles.form_item}>
          <label htmlFor="username">User Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            value={formData.username}
            required
          />
        </div>

        <div className={styles.form_item}>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            onChange={handleChange}
            value={formData.firstname}
            required
          />
        </div>

        <div className={styles.form_item}>
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            onChange={handleChange}
            value={formData.surname}
            required
          />
        </div>

        <div className={styles.form_item}>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            onChange={handleChange}
            value={formData.phone}
            required
          />
        </div>

        <div className={styles.form_item}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
          />
        </div>

        <div className={styles.form_item}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            required
          />
        </div>

        <div className={styles.Admin_btn}>
          <Button text="Register">Submit</Button>
        </div>

        <Link to="/user-login">
          <p>Already Registered? Login</p>
        </Link>
      </div>

      {error && <p className={styles.error_message}>{error}</p>}
      {successMessage && <p className={styles.success_message}>{successMessage}</p>}

      <div className={styles.typewriter_section}>
        <p className={styles.typewriter}>
          Join us today...<br />
          and grow your business!
        </p>
      </div>
    </form>
  );
};

export default Registration;
