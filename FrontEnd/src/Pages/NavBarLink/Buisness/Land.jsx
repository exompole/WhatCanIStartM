import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Land = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    alert("Please login to explore this business idea.");
    navigate("/user-login");
  };

  return (
    <div>
      <h1>Land Business</h1>

      <h3 onClick={handleClick} style={{ cursor: "pointer", color: "blue" }}>
        Organic Farming
      </h3>
      <p>Use your land for chemical-free crop production. Start selling to local markets.</p>

      <h3 onClick={handleClick} style={{ cursor: "pointer", color: "blue" }}>
        Agri-tourism
      </h3>
      <p>Host tourists on farmland for a unique village experience. Earn through stays and activities.</p>
    </div>
  );
};

export default Land;
