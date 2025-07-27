import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import logo from "../images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    window.addEventListener("userLogin", handleUserChange);
    window.addEventListener("userLogout", handleUserChange);

    return () => {
      window.removeEventListener("userLogin", handleUserChange);
      window.removeEventListener("userLogout", handleUserChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsDropdownOpen(false);
    // Dispatch custom event
    window.dispatchEvent(new Event("userLogout"));
    navigate("/");
  };

  const handleProtectedLink = (route, message) => {
    if (!user) {
      alert(message);
      navigate("/user-login");
    } else {
      navigate(route);
    }
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

        {/* Center Section - Navigation Links */}
        <div className={styles.centerSection}>
          <ul className={styles.navLinks}>
            <li><Link to="/business" className={styles.navLink}>Business</Link></li>
            <li><Link to="/contact" className={styles.navLink}>Contact</Link></li>
            <li><Link to="/about" className={styles.navLink}>About</Link></li>
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
        <div className={styles.rightSection}>
          {user ? (
            <div className={styles.userSection}>
              <div className={styles.userInfo}>
                <span className={styles.welcomeText}>Welcome,</span>
                <span className={styles.userName}>{user.username || user.name || "User"}</span>
              </div>
              <div className={styles.userActions}>
                <button 
                  className={styles.ideaButton}
                  onClick={() => navigate("/Idea")}
                >
                 Generate Idea
                </button>
                <button
                  onClick={handleLogout}
                  className={styles.logoutButton}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login" className={styles.loginButton}>Login</Link>
              <Link to="/registration" className={styles.loginButton}>Register</Link>
              <button 
                className={styles.ideaButton}
                onClick={() => handleProtectedLink("/Idea", "Please login to access business ideas.")}
              >
               Generate Idea
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
