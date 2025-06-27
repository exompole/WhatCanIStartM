import styles from "./Footer.module.css";
import { FaInstagram, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <p>&copy; {new Date().getFullYear()} What Can I Start — All rights reserved.</p>
      </div>

      <div className={styles.right}>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className={styles.icon} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className={styles.icon} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className={styles.icon} />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <FaGithub className={styles.icon} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
