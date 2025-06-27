import { useNavigate } from "react-router-dom";

const RawMaterials = () => {
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
      <h1>Raw Materials Business</h1>

      <h3 onClick={() => handleClick("Textile Production")} style={{ cursor: "pointer", color: "blue" }}>
        Textile Production
      </h3>
      <p>Use cotton or fabric stock to manufacture clothes.</p>

      <h3 onClick={() => handleClick("Wood Crafting")} style={{ cursor: "pointer", color: "blue" }}>
        Wood Crafting
      </h3>
      <p>Convert wood into decor or furniture for sale.</p>
    </div>
  );
};

export default RawMaterials;
