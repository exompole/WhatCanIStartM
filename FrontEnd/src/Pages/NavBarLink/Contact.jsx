import Button from "../../components/Button";
import { IoIosMail } from "react-icons/io";
import { MdCall } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";
import styles from "./Contact.module.css";
import contactImg from "../../images/contactImg.png";

const Contact = () => {
  return (
    <section className={styles.container}>
      <div className={styles.contact_form}>
        <div className={styles.contact_section}>
          <h1>CONTACT US</h1>
          <p>
            Our team is 24/7 here to help. Please choose how you need assistance.
          </p>
        </div>

        <div className={styles.top_btn}>
          <Button icon={<IoIosMail fontSize={24} />} text="VIA EMAIL" />
          <Button icon={<MdCall fontSize={24} />} text="VIA CALL" />
          <Button
            isOutline={true}
            icon={<IoMdChatbubbles fontSize={24} />}
            text="CHAT SUPPORT"
          />
        </div>

        <form>
          <p>Please describe your problem below and we will revert back as soon as possible</p>

          <div className={styles.form_control}>
            <label htmlFor="Name">Name</label>
            <input type="text" />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="email">Email</label>
            <input type="email" />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="text">Describe Your Problem Below</label>
            <textarea name="text" rows={10} />
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button text="SUBMIT" />
          </div>
        </form>
      </div>
      <div className={styles.contact_image}>
        <img src={contactImg} alt="Contact" />
      </div>
    </section>
  );
};

export default Contact;
