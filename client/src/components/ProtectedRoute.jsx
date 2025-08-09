import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SessionManager from "../utils/sessionManager";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const checkSession = () => {
      if (!SessionManager.isSessionValid()) {
        SessionManager.clearSession();
        setIsValid(false);
        return;
      }

      setIsValid(true);
    };

    checkSession();

    // Check session every minute
    const interval = setInterval(checkSession, 60000);

    // Listen for logout events
    const handleLogout = () => {
      setIsValid(false);
    };

    // Listen for session refresh events
    const handleSessionRefresh = () => {
      setIsValid(true);
    };

    window.addEventListener("userLogout", handleLogout);
    window.addEventListener("sessionRefreshed", handleSessionRefresh);

    return () => {
      clearInterval(interval);
      window.removeEventListener("userLogout", handleLogout);
      window.removeEventListener("sessionRefreshed", handleSessionRefresh);
    };
  }, []);

  if (isValid === null) {
    // Still checking
    return <div>Loading...</div>;
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
