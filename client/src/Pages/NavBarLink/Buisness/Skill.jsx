import { useNavigate } from "react-router-dom";

const Skills = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    alert("Please login to explore this business idea.");
    navigate("/user-login");
  };

  return (
    <div>
      <h1>Skills-Based Business</h1>

      <h3 onClick={handleClick} style={{ cursor: "pointer", color: "blue" }}>
        Graphic Design
      </h3>
      <p>Use your design skills to create logos, flyers, and branding for small businesses.</p>

      <h3 onClick={handleClick} style={{ cursor: "pointer", color: "blue" }}>
        Online Tutoring
      </h3>
      <p>Teach languages, math, or coding online. Earn by scheduling hourly sessions.</p>
    </div>
  );
};

export default Skills;
