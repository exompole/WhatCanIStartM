import { useNavigate } from "react-router-dom";

const Land = () => {
  const navigate = useNavigate();

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
      <h3 onClick={() => handleClick("Organic Farming")}>Organic Farming</h3>
      <p>Use your land for chemical-free crop production.</p>

      <h3 onClick={() => handleClick("Agri-tourism")}>Agri-tourism</h3>
      <p>Host tourists on farmland for village experience.</p>

      <h3 onClick={() => handleClick("Goat Farming")}>Goat Farming</h3>
      <p>Raise goats for milk and meat.</p>

      <h3 onClick={() => handleClick("Lease for Solar Panels")}>Lease for Solar Panels</h3>
      <p>Lease land to solar companies.</p>

      <h3 onClick={() => handleClick("Plant Nursery")}>Plant Nursery</h3>
      <p>Grow and sell saplings and plants.</p>

      <h3 onClick={() => handleClick("Bee Keeping")}>Bee Keeping</h3>
      <p>Harvest honey with minimal setup.</p>

      <h3 onClick={() => handleClick("Fish Farming")}>Fish Farming</h3>
      <p>Use ponds to raise fish for local sale.</p>
    </div>
  );
};

export default Land;
