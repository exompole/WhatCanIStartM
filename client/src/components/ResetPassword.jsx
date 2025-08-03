
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { authAPI } from "../services/api";
import Button from "./Button";
import styles from "./ResetPassword.module.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    setLoading(true);
    setMessage("");
    setError("");
    
    try {
              const res = await authAPI.resetPassword(token, password);
      setMessage(res.data.message);
      
      // Clear password fields on success
      if (res.data.message === "Password reset successfully.") {
        setPassword("");
        setConfirmPassword("");
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/user-login");
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error resetting password");
    }
    setLoading(false);
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <div className={styles.formCard}>
        <div className={styles.header}>
          <h2>Reset Password</h2>
          <p>Enter your new password below</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="password">New Password</label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter new password"
                className={styles.input}
                minLength={6}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={styles.passwordContainer}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm new password"
                className={styles.input}
                minLength={6}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>
          
          <div className={styles.buttonGroup}>
            <Button 
              text={loading ? "Resetting..." : "Reset Password"} 
              type="submit" 
              disabled={loading}
              className={styles.submitButton}
            />
          </div>
          
          <div className={styles.links}>
            <Link to="/user-login" className={styles.backLink}>
              ← Back to Login
            </Link>
          </div>
        </form>
        
        {message && (
          <div className={styles.message}>
            {message}
            {message === "Password reset successfully." && (
              <p>Redirecting to login page...</p>
            )}
          </div>
        )}
        
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
