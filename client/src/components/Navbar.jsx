import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import axios from "axios";
import logo from "../images/Logo.png";
import SessionManager from "../utils/sessionManager";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showAdminKeyModal, setShowAdminKeyModal] = useState(false);
  const [adminKeyInput, setAdminKeyInput] = useState("");
  const [adminKeyError, setAdminKeyError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");

  const updateUserState = () => {
    try {
      const userDataString = localStorage.getItem("user");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        console.log("Navbar - User data from localStorage:", userData);
        console.log("Navbar - Session valid:", SessionManager.isSessionValid());
        setUser(userData);
      } else {
        console.log("Navbar - No user data in localStorage");
        setUser(null);
      }
    } catch (error) {
      console.error("Navbar - Error parsing user data:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    // Initial load
    updateUserState();

    // Listen for custom login/logout events
    const handleUserChange = () => {
      updateUserState();
    };

    // Listen for session refresh events
    const handleSessionRefresh = () => {
      updateUserState();
    };

    window.addEventListener("userLogin", handleUserChange);
    window.addEventListener("userLogout", handleUserChange);
    window.addEventListener("sessionRefreshed", handleSessionRefresh);

    // Check session remaining time every 30 seconds
    const sessionInterval = setInterval(() => {
      if (SessionManager.isSessionValid()) {
        const remaining = SessionManager.getRemainingTime();
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        setRemainingTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      } else {
        setRemainingTime("");
        // Auto logout if session expired
        if (user) {
          handleLogout();
        }
      }
    }, 30000);

    return () => {
      window.removeEventListener("userLogin", handleUserChange);
      window.removeEventListener("userLogout", handleUserChange);
      window.removeEventListener("sessionRefreshed", handleSessionRefresh);
      clearInterval(sessionInterval);
    };
  }, []);

  const handleLogout = () => {
    SessionManager.clearSession();
    setUser(null);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const handleProtectedLink = (route, message) => {
    if (!user) {
      alert(message);
      navigate("/LoginRegistration");
    } else {
      navigate(route);
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={styles.Navbar}>
      <nav className={styles.nav}>
        {/* Left Section - Logo and Brand Name */}
        <div className={styles.leftSection}>
          <Link to="/" className={styles.logoLink}>
            <img className={styles.logo} src={logo} alt="WhatCanIStart Logo" />
            <span className={styles.brandName}>WhatCanIStart</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className={styles.mobileMenuButton}>
          <button onClick={toggleMobileMenu} className={styles.hamburgerButton}>
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`}></span>
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`}></span>
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`}></span>
          </button>
        </div>

        {/* Center Section - Navigation Links */}
        <div className={`${styles.centerSection} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <ul className={styles.navLinks}>
            <li><Link to="/business" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Business</Link></li>
            <li><Link to="/contact" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
            <li><Link to="/about" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
            <li><Link to="/PremiumPlans" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Premium Plans</Link></li>
            <li>
              <button 
                className={styles.navButton}
                onClick={() => handleProtectedLink("/lemon", "Please login to access lemon by-products.")}
              >
                Lemon
              </button>
            </li>
          </ul>
        </div>

        {/* Right Section - Auth and User Actions */}
        <div className={`${styles.rightSection} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          {user ? (
            <div className={styles.userSection}>
              <div className={styles.userInfo}>
                <span className={styles.username}>Welcome, {user.username}</span>
                {remainingTime && (
                  <span className={styles.sessionTime}>
                    Session: {remainingTime}
                  </span>
                )}
              </div>
              {/* Show Admin Dashboard link if user is admin */}
              {user.isAdmin || user.role === "admin" || user.username === "admin" ? (
                <>
                  <button
                    className={styles.navButton}
                    onClick={() => {
                      setShowAdminKeyModal(true);
                      setAdminKeyInput("");
                      setAdminKeyError("");
                    }}
                  >
                    Admin Dashboard
                  </button>
                  {showAdminKeyModal && (
                    <div style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      background: "rgba(0,0,0,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 9999
                    }}>
                      <div style={{
                        background: "#fff",
                        padding: 32,
                        borderRadius: 12,
                        boxShadow: "0 4px 24px rgba(35,41,70,0.12)",
                        minWidth: 320,
                        textAlign: "center"
                      }}>
                        <h3 style={{ marginBottom: 16 }}>Admin Access Required</h3>
                        <p style={{ marginBottom: 16, color: "#232946" }}>
                          Please enter the admin secret key to access the dashboard.
                        </p>
                        <input
                          type="password"
                          value={adminKeyInput}
                          onChange={e => setAdminKeyInput(e.target.value)}
                          placeholder="Secret Key"
                          style={{
                            width: "100%",
                            padding: 10,
                            borderRadius: 6,
                            border: "1px solid #eebbc3",
                            marginBottom: 16,
                            fontSize: 16
                          }}
                        />
                        {adminKeyError && <div style={{ color: "red", marginBottom: 12 }}>{adminKeyError}</div>}
                        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                          <button
                            className={styles.navButton}
                            style={{ minWidth: 100, background: "#2c3e50", color: "#ecf0f1", fontWeight: 500, border: "none", borderRadius: 8, fontSize: 16, boxShadow: "0 2px 8px rgba(35,41,70,0.08)" }}
                            onClick={async () => {
                              if (!adminKeyInput) {
                                setAdminKeyError("Please enter the secret key.");
                                return;
                              }
                              try {
                                const res = await axios.post("http://localhost:5000/api/verify-admin-key", { key: adminKeyInput });
                                if (res.data.success) {
                                  localStorage.setItem("adminSecretKey", adminKeyInput);
                                  setShowAdminKeyModal(false);
                                  window.location.href = "/admin-dashboard";
                                } else {
                                  setAdminKeyError("Invalid secret key. Access denied.");
                                }
                              } catch (err) {
                                setAdminKeyError("Invalid secret key. Access denied.");
                              }
                            }}
                          >
                            Submit
                          </button>
                          <button
                            className={styles.navButton}
                            style={{ minWidth: 100, background: "#eebbc3", color: "#2c3e50", fontWeight: 500, border: "none", borderRadius: 8, fontSize: 16, boxShadow: "0 2px 8px rgba(35,41,70,0.08)" }}
                            onClick={() => setShowAdminKeyModal(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : null}
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/LoginRegistration" className={styles.loginBtn}>
                Login / Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
