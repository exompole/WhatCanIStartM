import { useState } from "react";
import axios from "axios";
import Button from "../../components/Button";
import { IoIosMail } from "react-icons/io";
import { MdCall } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";
import styles from "./Contact.module.css";
import contactImg from "../../images/contactImg.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     console.log("Submitting:", formData);
    axios
    
      .post("http://localhost:5000/api/contact", formData)
      .then((res) => {
        alert("Success: " + res.data.message);
        console.log("Server Response:", res.data);
      })
      .catch((err) => {
        alert("Error sending message");
        console.error(err);

       
      });
  };

  return (
    <section className={styles.container}>
      <div className={styles.contact_form}>
        <div className={styles.contact_section}>
          <h1>CONTACT US</h1>
          <p>
            Our team is 24/7 here to help. Please choose how you need
            assistance.
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

        <form onSubmit={handleSubmit}>
          <p>
            Please describe your problem below and we will revert back as soon
            as possible
          </p>

          <div className={styles.form_control}>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          <div className={styles.form_control}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div className={styles.form_control}>
            <label htmlFor="message">Describe Your Problem Below</label>
            <textarea
              name="message"
              rows={10}
              onChange={handleChange}
              value={formData.message}
            />
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
