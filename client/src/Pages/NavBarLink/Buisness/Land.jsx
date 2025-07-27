import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Land = () => {
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
      // Navigate with prompt
      navigate("/idea", { state: { prompt: `Suggest a business idea based on: ${idea}` } });
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Land Business</h1>
      
      <h3 onClick={() => handleClick("Organic Farming")} style={{ cursor: "pointer", color: "blue" }}>
        Organic Farming
      </h3>
      <p>Use your land for chemical-free crop production.</p>

      <h3 onClick={() => handleClick("Agri-tourism")} style={{ cursor: "pointer", color: "blue" }}>
        Agri-tourism
      </h3>
      <p>Host tourists on farmland for village experience.</p>

      <h3 onClick={() => handleClick("Goat Farming")} style={{ cursor: "pointer", color: "blue" }}>
        Goat Farming
      </h3>
      <p>Raise goats for milk and meat.</p>

      <h3 onClick={() => handleClick("Lease for Solar Panels")} style={{ cursor: "pointer", color: "blue" }}>
        Lease for Solar Panels
      </h3>
      <p>Lease land to solar companies.</p>

      <h3 onClick={() => handleClick("Plant Nursery")} style={{ cursor: "pointer", color: "blue" }}>
        Plant Nursery
      </h3>
      <p>Grow and sell saplings and plants.</p>
    </div>
  );
};

export default Land;
