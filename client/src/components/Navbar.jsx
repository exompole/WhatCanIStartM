import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className={styles.Navbar}>
      <nav>
        <Link to="/">
          <img className={styles.img} src={logo} alt="logo" />
        </Link>

        <ul>
          <li><Link to="/business">Business</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        <ul>
          {user ? (
            <>
              <li style={{ fontWeight: "bold", color: "#000" }}>
                Hi {user.username || user.name || "User"}
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "#f44336",
                    border: "none",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/registration">Register</Link></li>
            </>
          )}
          <li><Link to="/Idea">Idea</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
