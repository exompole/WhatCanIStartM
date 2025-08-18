
import { useState, useEffect } from "react";
import { authAPI } from "../services/api";
import { Link } from "react-router-dom";
import Button from "./Button";
import styles from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetLink, setResetLink] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    setResetLink("");
    
    console.log("ForgotPassword - Submitting email:", email);
    
    try {
      const res = await authAPI.forgotPassword({ email });
      console.log("ForgotPassword - API response:", res.data);
      setMessage(res.data.message);
      
      // If reset link is provided (when email is not configured)
      if (res.data.resetLink) {
        // Extract the token from the backend URL and create a proper frontend URL
        const token = res.data.resetLink.split('/').pop();
        const frontendResetLink = `${window.location.origin}/reset-password/${token}`;
        setResetLink(frontendResetLink);
        console.log("Original backend link:", res.data.resetLink);
        console.log("Frontend link:", frontendResetLink);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset link");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resetLink).then(() => {
      setMessage("Reset link copied to clipboard!");
    }).catch(() => {
      setError("Failed to copy link. Please copy it manually.");
    });
  };

  const handleResetLinkClick = (e) => {
    e.preventDefault();
    console.log("Navigating to:", resetLink);
    window.location.href = resetLink;
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <div className={styles.formCard}>
        <div className={styles.header}>
          <h2>Forgot Password</h2>
          <p>Enter your email to receive a password reset link</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
              className={styles.input}
            />
          </div>
          
          <div className={styles.buttonGroup}>
            <Button 
              text={loading ? "Sending..." : "Send Reset Link"} 
              type="submit" 
              disabled={loading}
              className={styles.submitButton}
            />
          </div>
          
          <div className={styles.links}>
            <Link to="/LoginRegistration" className={styles.backLink}>
              ← Back to Login
            </Link>
          </div>
        </form>
        
        {message && (
          <div className={styles.message}>
            {message}
          </div>
        )}
        
        {resetLink && (
          <div className={styles.resetLinkSection}>
            <h3>Reset Link Generated</h3>
            <p>Click the link below to reset your password:</p>
            <a 
              href={resetLink} 
              className={styles.resetLink}
              onClick={handleResetLinkClick}
            >
              {resetLink}
            </a>
            <button 
              onClick={copyToClipboard}
              className={styles.copyButton}
            >
              Copy Link
            </button>
            <p className={styles.debugInfo}>
              <small>Debug: Current origin is {window.location.origin}</small>
            </p>
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

export default ForgotPassword;
