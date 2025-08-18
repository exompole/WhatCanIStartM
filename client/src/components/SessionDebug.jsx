import { useState, useEffect } from "react";
import SessionManager from "../utils/sessionManager";

const SessionDebug = () => {
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    const updateDebugInfo = () => {
      const user = localStorage.getItem("user");
      const sessionExpire = localStorage.getItem("sessionExpire");
      
      setDebugInfo({
        user: user ? JSON.parse(user) : null,
        sessionExpire: sessionExpire ? new Date(parseInt(sessionExpire)).toLocaleString() : null,
        isSessionValid: SessionManager.isSessionValid(),
        remainingTime: SessionManager.formatRemainingTime(),
        currentTime: new Date().toLocaleString()
      });
    };

    updateDebugInfo();
    const interval = setInterval(updateDebugInfo, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!debugInfo.user) {
    return null; // Only show when user is logged in
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <h4>Session Debug Info:</h4>
      <div>User: {debugInfo.user?.username}</div>
      <div>Session Valid: {debugInfo.isSessionValid ? 'Yes' : 'No'}</div>
      <div>Remaining: {debugInfo.remainingTime}</div>
      <div>Expires: {debugInfo.sessionExpire}</div>
      <div>Current: {debugInfo.currentTime}</div>
    </div>
  );
};

export default SessionDebug;
