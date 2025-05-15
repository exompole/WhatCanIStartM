import { Link } from "react-router-dom";
import Land_img from "../../../images/Land_module_image.png";
import RawMaterial_img from "../../../images/raw_Material.png";
import Farmer_img from "../../../images/farmer.png";
import Skill from "../../../images/skill.png";
import styles from "./business.module.css";

const Business = () => {
  return (
    <div className={styles.container}>
      <h1>Businesses You Can Start In</h1>

      <div className={styles.imageRow}>
        <div className={styles.image}>
          <h3>Land</h3>
          <Link to="/land">
            <img src={Land_img} alt="Land" />
          </Link>
        </div>
        <div className={styles.image}>
          <h3>Raw Materials</h3>
          <Link to="/raw-material">
            <img src={RawMaterial_img} alt="Raw Materials" />
          </Link>
        </div>
        <div className={styles.image}>
          <h3>Farming</h3>
          <Link to="/farming">
            <img src={Farmer_img} alt="Farming" />
          </Link>
        </div>
        <div className={styles.image}>
          <h3>Skills</h3>
          <Link to="/skill">
            <img src={Skill} alt="Skills" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Business;
