import { useState, useEffect } from "react";
import SessionManager from "../utils/sessionManager";
import styles from "./SessionTimeoutWarning.module.css";

const SessionTimeoutWarning = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const checkSession = () => {
      if (SessionManager.isSessionExpiringSoon()) {
        const remaining = SessionManager.getRemainingTime();
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        setRemainingTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }
    };

    // Check every 30 seconds
    const interval = setInterval(checkSession, 30000);
    checkSession(); // Initial check

    return () => clearInterval(interval);
  }, []);

  const handleContinue = () => {
    SessionManager.refreshSession();
    setShowWarning(false);
    window.dispatchEvent(new Event("sessionRefreshed"));
  };

  const handleLogout = () => {
    SessionManager.clearSession();
    setShowWarning(false);
  };

  if (!showWarning) {
    return null;
  }

  return (
    <div className={styles.warningOverlay}>
      <div className={styles.warningModal}>
        <div className={styles.warningHeader}>
          <h3>Session Timeout Warning</h3>
          <div className={styles.timer}>
            Time remaining: <span className={styles.timeLeft}>{remainingTime}</span>
          </div>
        </div>
        <div className={styles.warningContent}>
          <p>Your session will expire soon. Would you like to continue and refresh your session?</p>
        </div>
        <div className={styles.warningActions}>
          <button onClick={handleContinue} className={styles.continueBtn}>
            Continue Session
          </button>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeoutWarning;
