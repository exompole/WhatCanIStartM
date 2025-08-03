import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import  logo  from "../images/Logo.png"; 

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false);
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
                <span className={styles.welcomeText}>Welcome,</span>
                <span className={styles.userName}>{user.username || user.name || "User"}</span>
              </div>
              <div className={styles.userActions}>
                <button 
                  className={styles.ideaButton}
                  onClick={() => {
                    navigate("/Idea");
                    setIsMobileMenuOpen(false);
                  }}
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
              <Link to="/login" className={styles.loginButton} onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              <Link to="/registration" className={styles.loginButton} onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
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
