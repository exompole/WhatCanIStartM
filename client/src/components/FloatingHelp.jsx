import { useState } from "react";
import styles from "./FloatingHelp.module.css";
import Button from "./Button";
import { FiMessageSquare } from 'react-icons/fi';

const FloatingHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div className={styles.floating_help} onClick={toggleChat}>
        <FiMessageSquare size={20} />
      </div>

      <div
        className={`${styles.chat_modal} ${
          isOpen ? styles.chat_modal_active : ""
        }`}
      >
        <h4>Need Help?</h4>
        <textarea placeholder="Ask us anything..."></textarea>
        <Button text="Submit"/>
      </div>
    </div>
  );
};

export default FloatingHelp;
