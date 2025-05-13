import { Link } from "react-router-dom";
import "./Navbar.module.css"
import logo from "../images/logo.png"; 

const Navbar = () => {
  return (
    <div className="Navbar">
      <nav>
        <Link to="/"><img className="img" src={logo} alt="logo" /></Link>
        <ul>
          <li><Link to="/business">Business</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/registration">Register</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
