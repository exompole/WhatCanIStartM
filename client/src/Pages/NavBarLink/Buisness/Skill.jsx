import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Skills = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClick = (idea) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login to explore this business idea.");
              navigate("/LoginRegistration");
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

      <h3 onClick={() => handleClick("Content Writing")} style={{ cursor: "pointer", color: "blue" }}>
        Content Writing
      </h3>
      <p>Write articles, blogs, and marketing content for businesses and websites. Freelance opportunities available.</p>

      <h3 onClick={() => handleClick("Digital Marketing")} style={{ cursor: "pointer", color: "blue" }}>
        Digital Marketing
      </h3>
      <p>Help businesses grow online through social media management, SEO, and advertising campaigns.</p>

      <h3 onClick={() => handleClick("Web Development")} style={{ cursor: "pointer", color: "blue" }}>
        Web Development
      </h3>
      <p>Build websites and web applications for clients. High demand for custom solutions and e-commerce platforms.</p>
    </div>
  );
};

export default Skills;
