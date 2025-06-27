import { useNavigate } from "react-router-dom";

const Skills = () => {
  const navigate = useNavigate();

  const handleClick = (idea) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login to explore this business idea.");
      navigate("/user-login");
    } else {
      navigate("/idea", { state: { prompt: idea } });
    }
  };

  return (
    <div>
      <h1>Skills-Based Business</h1>

      <h3 onClick={() => handleClick("Graphic Design")} style={{ cursor: "pointer", color: "blue" }}>
        Graphic Design
      </h3>
      <p>Create logos, branding, and graphics for small businesses.</p>

      <h3 onClick={() => handleClick("Online Tutoring")} style={{ cursor: "pointer", color: "blue" }}>
        Online Tutoring
      </h3>
      <p>Teach languages, math, or coding online. Earn through hourly sessions.</p>
    </div>
  );
};

export default Skills;
