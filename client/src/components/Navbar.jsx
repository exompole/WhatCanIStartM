import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import logo from "../images/Logo.png";
import SessionManager from "../utils/sessionManager";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");

  const updateUserState = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
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
      navigate("/user-login");
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
            <li><Link to="/PaymentForm" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>PaymentForm</Link></li>
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
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/user-login" className={styles.loginBtn}>
                Login
              </Link>
              <Link to="/registration" className={styles.registerBtn}>
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
