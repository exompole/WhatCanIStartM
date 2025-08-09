import styles from "./UserLogin.module.css";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { authAPI } from "../../services/api";
import Logo from "../../images/Logo.png";
import SessionManager from "../../utils/sessionManager";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    const errors = {};
    
    // Username validation
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }
    
    // Password validation
    if (!formData.password.trim()) {
      errors.password = "Password is required";
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
    
    // Clear general error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await authAPI.login(formData);
      
      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      // Set session expiration using SessionManager
      const expireTime = new Date().getTime() + SessionManager.SESSION_DURATION;
      localStorage.setItem("sessionExpire", expireTime.toString());
      
      // Dispatch custom event to update navbar
      window.dispatchEvent(new Event("userLogin"));
      
      // Redirect to home
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClassName = (fieldName) => {
    return `${styles.form_input} ${validationErrors[fieldName] ? styles.error_input : ''}`;
  };

  return (
    <form className={styles.login_form} onSubmit={handleSubmit}>
      <div className={styles.form_fields}>
        <div className={styles.header_section}>
          <img src={Logo} alt="Logo" className={styles.form_logo} />
          <h2>Welcome Back</h2>
          <p className={styles.subtitle}>Sign in to continue your business journey</p>
        </div>

        <div className={styles.form_content}>
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
              autoComplete="username"
              required
            />
            {validationErrors.username && (
              <span className={styles.error_text}>{validationErrors.username}</span>
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
                autoComplete="current-password"
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

          <div className={styles.submit_section}>
            <div className={styles.Admin_btn}>
              <Button 
                text={isLoading ? "Signing In..." : "Sign In"} 
                type="submit" 
                disabled={isLoading}
                className={styles.loginButton}
              />
            </div>
          </div>

          <div className={styles.Link}>
            <div className={styles.forgot_link}>
              <p>Forgot your password? <Link to="/forgot-password">Reset here</Link></p>
            </div>
          </div>

          {error && <p className={styles.error_message}>{error}</p>}
        </div>
      </div>
    </form>
  );
};

export default UserLogin;
