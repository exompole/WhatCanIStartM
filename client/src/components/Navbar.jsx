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
          <li>
            <a
              href="#"
              onClick={e => {
                if (!user) {
                  e.preventDefault();
                  alert("Please login to access lemon by-products.");
                  navigate("/login");
                } else {
                  navigate("/lemon");
                }
              }}
            >
              Lemon
            </a>
          </li>
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
                  className={styles.logoutButton}
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
          <li>
            <a
              href="#"
              onClick={e => {
                if (!user) {
                  e.preventDefault();
                  alert("Please login to access business ideas.");
                  navigate("/login");
                } else {
                  navigate("/Idea");
                }
              }}
            >
              Idea
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
