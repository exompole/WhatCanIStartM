import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api";
import styles from "./LoginRegistration.module.css";
import UserLoginImg from "../../images/UserLogin.png";
import RegistrationImg from "../../images/registration.png";

const LoginRegistration = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Toggle between Login and Registration
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: "",
      first_name: "",
      surname: "",
      email: "",
      phone: "",
      password: "",
    });
    setErrors({});
    setMessage("");
    setShowPassword(false);
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage("");
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    const trimmedData = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [k, v.trim()])
    );

    if (!trimmedData.username) newErrors.username = "Username is required";
    if (!isLogin) {
      if (!trimmedData.first_name)
        newErrors.first_name = "First name is required";
      if (!trimmedData.surname) newErrors.surname = "Surname is required";
      if (!/\S+@\S+\.\S+/.test(trimmedData.email))
        newErrors.email = "Valid email is required";
      if (!/^\d{10}$/.test(trimmedData.phone))
        newErrors.phone = "Valid 10-digit phone number required";
    }
    if (!trimmedData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 ? trimmedData : null;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validData = validate();
    if (!validData) return;

    setIsLoading(true);
    try {
      if (isLogin) {
        const res = await authAPI.login({
          username: validData.username,
          password: validData.password,
        });
        console.log("Login successful - User data:", res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem(
          "sessionExpire",
          new Date().getTime() + 30 * 60 * 1000
        );
        console.log("Session data saved - User:", res.data.user.username);
        window.dispatchEvent(new Event("userLogin"));
        navigate("/");
      } else {
        const res = await authAPI.register(validData);
        setMessage(res.data.message || "Registration successful!");
        // Optional auto-login after register
        const loginRes = await authAPI.login({
          username: validData.username,
          password: validData.password,
        });
        console.log("Registration successful - User data:", loginRes.data.user);
        localStorage.setItem("user", JSON.stringify(loginRes.data.user));
        localStorage.setItem(
          "sessionExpire",
          new Date().getTime() + 30 * 60 * 1000
        );
        console.log("Session data saved - User:", loginRes.data.user.username);
        window.dispatchEvent(new Event("userLogin"));
        navigate("/");
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={() => navigate("/")}>
          ×
        </button>

        <div
          className={styles.formSlider}
          style={{ transform: isLogin ? "translateX(0)" : "translateX(-50%)" }}
        >
          {/* Login Form */}
          <div className={styles.formContainer}>
            <div className={styles.formSection}>
              <h2 className={styles.modalHeader}>Welcome Back</h2>
              {message && (
                <div
                  className={
                    message.toLowerCase().includes("success")
                      ? styles.success
                      : styles.error_message
                  }
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className={errors.username ? styles.inputError : ""}
                  />
                  {errors.username && (
                    <span className={styles.error}>{errors.username}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? styles.inputError : ""}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                  {errors.password && (
                    <span className={styles.error}>{errors.password}</span>
                  )}
                </div>

                <div className={styles.formOptions}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <button 
                    type="button" 
                    className={styles.forgotLink}
                    onClick={() => {
                      console.log("Forgot Password button clicked");
                      navigate("/forgot-password");
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>

                <div className={styles.switchLink}>
                  Don't have an account? <span onClick={toggleMode}>Sign Up</span>
                </div>
              </form>
            </div>
            <div className={styles.imageSection}>
              <img src={UserLoginImg} alt="Login" className={styles.formImage} />
              <div className={styles.imageOverlay}>
                <h3>Welcome Back!</h3>
                <p>Sign in to continue your journey with us</p>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className={styles.formContainer}>
            <div className={styles.formSection}>
              <h2 className={styles.modalHeader}>Create Account</h2>
              {message && (
                <div
                  className={
                    message.toLowerCase().includes("success")
                      ? styles.success
                      : styles.error_message
                  }
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.nameGroup}>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className={errors.first_name ? styles.inputError : ""}
                    />
                    {errors.first_name && (
                      <span className={styles.error}>{errors.first_name}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      name="surname"
                      placeholder="Surname"
                      value={formData.surname}
                      onChange={handleChange}
                      className={errors.surname ? styles.inputError : ""}
                    />
                    {errors.surname && (
                      <span className={styles.error}>{errors.surname}</span>
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className={errors.username ? styles.inputError : ""}
                  />
                  {errors.username && (
                    <span className={styles.error}>{errors.username}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? styles.inputError : ""}
                  />
                  {errors.email && (
                    <span className={styles.error}>{errors.email}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? styles.inputError : ""}
                  />
                  {errors.phone && (
                    <span className={styles.error}>{errors.phone}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? styles.inputError : ""}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                  {errors.password && (
                    <span className={styles.error}>{errors.password}</span>
                  )}
                </div>

                <div className={styles.formOptions}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" required />
                    <span>
                      I agree to the Terms of Service and Privacy Policy
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>

                <div className={styles.switchLink}>
                  Already have an account?{" "}
                  <span onClick={toggleMode}>Sign In</span>
                </div>
              </form>
            </div>
            <div className={styles.imageSection}>
              <img src={RegistrationImg} alt="Registration" className={styles.formImage} />
              <div className={styles.imageOverlay}>
                <h3>Join Us Today!</h3>
                <p>Create your account and start your journey</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegistration;
