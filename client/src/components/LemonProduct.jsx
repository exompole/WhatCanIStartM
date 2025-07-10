import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LemonProducts.module.css";
import { Search, Sparkles } from "lucide-react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function LemonProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/lemon-products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleGeminiClick = (productName) => {
    const prompt = `Give me in-depth business information about ${productName}. Include step-by-step execution plan, investment breakdown, risk factors, legal process, and future market opportunity.`;
    navigate("/Idea", { state: { prompt } });
  };

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading lemon products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>🍋 Lemon By-Products</h2>

      <div className={styles.searchBox}>
        <Search size={18} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchBar}
        />
      </div>

      {filteredProducts.length === 0 && <p>No matching products found.</p>}

      <ul className={styles.productList}>
        {filteredProducts.map((product, index) => (
          <li key={product._id} className={styles.card}>
            <div className={styles.titleRow} onClick={() => toggleExpand(index)}>
              <h3>{product.product_name}</h3>
              {expandedIndex === index ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
            </div>
            {expandedIndex === index && (
              <div className={styles.details}>
                <p>{product.description}</p>
                <p><strong>Initial Investment:</strong> {product.initial_investment}</p>
                <p><strong>ROI:</strong> {product.roi}</p>
                <p><strong>Difficulty:</strong> {product.difficulty_level}</p>
                <p><strong>Legal Requirements:</strong> {product.legal_requirements?.join(", ")}</p>
                <p><strong>Govt Schemes:</strong> {product.govt_schemes?.join(", ")}</p>
                <p><strong>Locations:</strong> {product.location_suitability?.join(", ")}</p>
                <p><strong>Target Market:</strong> {product.target_market?.join(", ")}</p>
                {product.budget_breakdown && (
                  <>
                    <h4>💰 Budget Breakdown:</h4>
                    <ul>
                      {Object.entries(product.budget_breakdown).map(([key, value]) => (
                        <li key={key}><strong>{key}:</strong> {value}</li>
                      ))}
                    </ul>
                  </>
                )}
                <p><strong>Law Details:</strong> {product.law_details}</p>
                <p><strong>License Process:</strong> {product.license_process}</p>
                <p><strong>Scheme Details:</strong> {product.govt_scheme_details}</p>
                <button
                  className={styles.geminiButton}
                  onClick={() => handleGeminiClick(product.product_name)}
                >
                  <Sparkles size={16} /> Get Gemini Insights
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LemonProducts;
