import styles from "./Registration.module.css";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiZap, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';
import { authAPI } from "../../services/api";

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
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    const errors = {};
    
    // Username validation
    if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters long";
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }
    
    // Password validation
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    
    // Name validation
    if (formData.firstname.length < 2) {
      errors.firstname = "First name must be at least 2 characters long";
    }
    
    if (formData.surname.length < 2) {
      errors.surname = "Surname must be at least 2 characters long";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await authAPI.register(formData);
      setSuccessMessage(res.data.message);
      setFormData({
        username: "",
        firstname: "",
        surname: "",
        email: "",
        phone: "",
        password: "",
      });
      setValidationErrors({});
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClassName = (fieldName) => {
    return `${styles.form_input} ${validationErrors[fieldName] ? styles.error_input : ''}`;
  };

  return (
    <form className={styles.registration_form} onSubmit={handleSubmit}>
      <div className={styles.form_fields}>
        <div className={styles.header_section}>
          <h2>Create Your Account</h2>
          <p className={styles.subtitle}>Join our community and start your business journey</p>
        </div>
        
        <div className={styles.form_grid}>
          <div className={styles.form_item}>
            <label htmlFor="username">Username *</label>
            <input
              type="text"
              id="username"
              name="username"
              className={getInputClassName('username')}
              onChange={handleChange}
              value={formData.username}
              placeholder="Enter your username"
              required
            />
            {validationErrors.username && (
              <span className={styles.error_text}>{validationErrors.username}</span>
            )}
          </div>
          
          <div className={styles.form_item}>
            <label htmlFor="firstname">First Name *</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              className={getInputClassName('firstname')}
              onChange={handleChange}
              value={formData.firstname}
              placeholder="Enter your first name"
              required
            />
            {validationErrors.firstname && (
              <span className={styles.error_text}>{validationErrors.firstname}</span>
            )}
          </div>
          
          <div className={styles.form_item}>
            <label htmlFor="surname">Surname *</label>
            <input
              type="text"
              id="surname"
              name="surname"
              className={getInputClassName('surname')}
              onChange={handleChange}
              value={formData.surname}
              placeholder="Enter your surname"
              required
            />
            {validationErrors.surname && (
              <span className={styles.error_text}>{validationErrors.surname}</span>
            )}
          </div>
          
          <div className={styles.form_item}>
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={getInputClassName('phone')}
              onChange={handleChange}
              value={formData.phone}
              placeholder="Enter 10-digit phone number"
              required
            />
            {validationErrors.phone && (
              <span className={styles.error_text}>{validationErrors.phone}</span>
            )}
          </div>
          
          <div className={styles.form_item}>
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              className={getInputClassName('email')}
              onChange={handleChange}
              value={formData.email}
              placeholder="Enter your email address"
              required
            />
            {validationErrors.email && (
              <span className={styles.error_text}>{validationErrors.email}</span>
            )}
          </div>
          
          <div className={styles.form_item}>
            <label htmlFor="password">Password *</label>
            <div className={styles.password_container}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className={getInputClassName('password')}
                onChange={handleChange}
                value={formData.password}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className={styles.password_toggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {validationErrors.password && (
              <span className={styles.error_text}>{validationErrors.password}</span>
            )}
          </div>
        </div>
        
        <div className={styles.submit_section}>
          <div className={styles.Admin_btn}>
                          <Button 
                text={isLoading ? "Creating Account..." : "Create Account"} 
                type="submit" 
                disabled={isLoading}
                className={styles.registerButton}
              />
          </div>
        </div>
        
        {error && <p className={styles.error_message}>{error}</p>}
        {successMessage && <p className={styles.success_message}>{successMessage}</p>}
      </div>
      
      <div className={styles.typewriter_section}>
        <div className={styles.typewriter_content}>
          <span className={styles.typewriter}>
            Join us today...and grow
          </span>
          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.feature_icon}><FiZap /></span>
              <span>Start Your Business</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.feature_icon}><FiCheckCircle /></span>
              <span>Get Expert Ideas</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.feature_icon}><FiTrendingUp /></span>
              <span>Scale & Succeed</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Registration;
