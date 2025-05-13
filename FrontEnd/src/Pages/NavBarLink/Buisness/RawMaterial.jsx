import { useNavigate } from "react-router-dom";

const RawMaterials = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    alert("Please login to explore this business idea.");
    navigate("/user-login");
  };

  return (
    <div>
      <h1>Raw Materials Business</h1>

      <h3 onClick={handleClick} style={{ cursor: "pointer", color: "blue" }}>
        Textile Production
      </h3>
      <p>Use cotton or fabric stock to manufacture clothes. Supply to local vendors or online stores.</p>

      <h3 onClick={handleClick} style={{ cursor: "pointer", color: "blue" }}>
        Wood Crafting
      </h3>
      <p>Convert wood into decor or furniture. Sell via craft exhibitions or custom orders.</p>
    </div>
  );
};

export default RawMaterials;
