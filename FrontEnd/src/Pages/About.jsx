import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about_container}>
      <div className={styles.about_content}>
        <h1>About Us</h1>
        <p>
          At our core, we are a business dedicated to empowering individuals by
          helping them unlock entrepreneurial opportunities based on the
          resources they already possess. Whether it’s time, skills, space, or
          equipment, we believe that everyone has untapped potential to start
          something meaningful. Our goal is to bridge the gap between what
          people have and what they can build—be it a side hustle, a home
          business, or a full-scale venture. Through research, insights, and
          practical guidance, we strive to ignite the entrepreneurial spirit and
          enable sustainable, resource-based business ideas for aspiring
          founders around the world.
        </p>
        
      </div>
      <div className={styles.about_image}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1055/1055646.png"
          alt="Team illustration"
        />
      </div>
    </div>
  );
};

export default About;
