import styles from './Registration.module.css'; 
import registration from "../images/registration.png"
import Button from "../components/Button"

const Registration = () => {
  return (
    <div className={styles.registration_container}>
      
      <form className={styles.registration_form}>
      <h2>User Registration</h2>
      <div className={styles.form_item}>
          <label htmlFor="user name">User Name:</label>
          <input type="text" id="user_name" name="user_name" required />
        </div>
        <div className={styles.form_item}>
          <label htmlFor="first_name">First Name:</label>
          <input type="text" id="first_name" name="first_name" required />
        </div>

        <div className={styles.form_item}>
          <label htmlFor="surname">Surname:</label>
          <input type="text" id="surname" name="surname" required />
        </div>

        <div className={styles.form_item}>
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone" required />
        </div>

        <div className={styles.form_item}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className={styles.form_item}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        
        <Button text="submit" className={styles.register_btn}>Register</Button>
      </form>
      <div className={styles.registration_img}><img src={registration} height="600px"  alt="registration" /></div>
      
    </div>
  );
};

export default Registration;
