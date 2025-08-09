// Session management utility
export class SessionManager {
  static SESSION_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
  static WARNING_TIME = 5 * 60 * 1000; // 5 minutes before expiry to show warning

  // Check if session is valid
  static isSessionValid() {
    const user = localStorage.getItem("user");
    const sessionExpire = localStorage.getItem("sessionExpire");

    if (!user || !sessionExpire) {
      return false;
    }

    const currentTime = new Date().getTime();
    const expirationTime = parseInt(sessionExpire);

    return currentTime < expirationTime;
  }

  // Get remaining session time in milliseconds
  static getRemainingTime() {
    const sessionExpire = localStorage.getItem("sessionExpire");
    if (!sessionExpire) return 0;

    const currentTime = new Date().getTime();
    const expirationTime = parseInt(sessionExpire);
    const remaining = expirationTime - currentTime;

    return remaining > 0 ? remaining : 0;
  }

  // Check if session will expire soon (within warning time)
  static isSessionExpiringSoon() {
    const remaining = this.getRemainingTime();
    return remaining > 0 && remaining <= this.WARNING_TIME;
  }

  // Refresh session (extend expiration time)
  static refreshSession() {
    if (!this.isSessionValid()) {
      return false;
    }

    const newExpireTime = new Date().getTime() + this.SESSION_DURATION;
    localStorage.setItem("sessionExpire", newExpireTime.toString());
    return true;
  }

  // Clear session
  static clearSession() {
    localStorage.removeItem("user");
    localStorage.removeItem("sessionExpire");
    window.dispatchEvent(new Event("userLogout"));
  }

  // Format remaining time for display
  static formatRemainingTime() {
    const remaining = this.getRemainingTime();
    if (remaining <= 0) return "Expired";

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // Start session monitoring
  static startSessionMonitoring() {
    // Check session every minute
    const interval = setInterval(() => {
      if (!this.isSessionValid()) {
        this.clearSession();
        clearInterval(interval);
        return;
      }

      // Show warning if session is expiring soon
      if (this.isSessionExpiringSoon()) {
        this.showSessionWarning();
      }
    }, 60000); // Check every minute

    return interval;
  }

  // Show session warning
  static showSessionWarning() {
    const remaining = this.getRemainingTime();
    const minutes = Math.floor(remaining / 60000);
    
    const shouldContinue = window.confirm(
      `Your session will expire in ${minutes} minutes. Would you like to continue and refresh your session?`
    );

    if (shouldContinue) {
      this.refreshSession();
      window.dispatchEvent(new Event("sessionRefreshed"));
    } else {
      this.clearSession();
    }
  }
}

export default SessionManager;
