import { useNavigate } from "react-router-dom";

const Land = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    alert("Please login to explore this business idea.");
    navigate("/user-login");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Land Business</h1>

      <h3 onClick={handleClick} style={{ cursor: "pointer", color: "blue" }}>
        Organic Farming
      </h3>
      <p>Use your land for chemical-free crop production. Start selling to local markets.</p>

      <h3 onClick={handleClick} style={{ cursor: "pointer", color: "blue" }}>
        Agri-tourism
      </h3>
      <p>Host tourists on farmland for a unique village experience. Earn through stays and activities.</p>

      <h3 onClick={handleClick} style={{ cursor: "pointer", color: "blue" }}>
        Goat Farming
      </h3>
      <p>Raise goats for milk and meat. Low investment and high returns.</p>

      <h3 onClick={handleClick} style={{ cursor: "pointer", color: "blue" }}>
        Lease for Solar Panels
      </h3>
      <p>Lease unused land to solar companies and earn steady rental income.</p>

      <h3 onClick={handleClick} style={{ cursor: "pointer", color: "blue" }}>
        Plant Nursery
      </h3>
      <p>Grow and sell saplings and plants for homes and farms.</p>

      <h3 onClick={handleClick} style={{ cursor: "pointer", color: "blue" }}>
        Bee Keeping
      </h3>
      <p>Harvest honey and other bee products with small setup costs.</p>

      <h3 onClick={handleClick} style={{ cursor: "pointer", color: "blue" }}>
        Fish Farming
      </h3>
      <p>Use ponds or tanks to raise fish like catla, rohu, or tilapia for local sale.</p>
    </div>
  );
};

export default Land;
