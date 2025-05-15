import { useNavigate } from "react-router-dom";

const Farming = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    alert("Please login to explore this business idea.");
    navigate("/user-login");
  };

  return (
    <div>
      <h1>Farming Business</h1>

      <h3 onClick={handleClick} style={{ cursor: "pointer", color: "blue" }}>
        Poultry Farming
      </h3>
      <p>Raise chickens for meat or eggs. Sell directly or to local stores.</p>

      <h3 onClick={handleClick} style={{ cursor: "pointer", color: "blue" }}>
        Beekeeping
      </h3>
      <p>Start a honey production business using beehives. Market your own brand.</p>
    </div>
  );
};

export default Farming;
