import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RawMaterials = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      <h3 onClick={() => handleClick("Metal Fabrication")} style={{ cursor: "pointer", color: "blue" }}>
        Metal Fabrication
      </h3>
      <p>Create metal products, tools, or decorative items from raw metal materials.</p>

      <h3 onClick={() => handleClick("Paper Products")} style={{ cursor: "pointer", color: "blue" }}>
        Paper Products
      </h3>
      <p>Manufacture notebooks, packaging materials, or eco-friendly paper products from raw paper stock.</p>

      <h3 onClick={() => handleClick("Plastic Recycling")} style={{ cursor: "pointer", color: "blue" }}>
        Plastic Recycling
      </h3>
      <p>Collect and process plastic waste to create new products or sell recycled materials to manufacturers.</p>
    </div>
  );
};

export default RawMaterials;
