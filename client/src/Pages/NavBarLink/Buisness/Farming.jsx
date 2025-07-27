import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Farming = () => {
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
      <h1>Farming Business</h1>

      <h3 onClick={() => handleClick("Poultry Farming")} style={{ cursor: "pointer", color: "blue" }}>
        Poultry Farming
      </h3>
      <p>Raise chickens for meat or eggs. Sell directly or to local stores.</p>

      <h3 onClick={() => handleClick("Beekeeping")} style={{ cursor: "pointer", color: "blue" }}>
        Beekeeping
      </h3>
      <p>Start a honey production business using beehives. Market your own brand.</p>

      <h3 onClick={() => handleClick("Dairy Farming")} style={{ cursor: "pointer", color: "blue" }}>
        Dairy Farming
      </h3>
      <p>Raise cows or buffaloes for milk production. Supply to local dairies or start your own dairy products business.</p>

      <h3 onClick={() => handleClick("Mushroom Cultivation")} style={{ cursor: "pointer", color: "blue" }}>
        Mushroom Cultivation
      </h3>
      <p>Grow mushrooms in controlled environments. High demand in restaurants and health-conscious consumers.</p>

      <h3 onClick={() => handleClick("Aquaponics Farming")} style={{ cursor: "pointer", color: "blue" }}>
        Aquaponics Farming
      </h3>
      <p>Combine fish farming with hydroponic vegetable growing. Sustainable and profitable modern farming method.</p>
    </div>
  );
};

export default Farming;
