import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LemonProducts.module.css";
import { Search, Sparkles, Filter, TrendingUp, DollarSign, MapPin } from "lucide-react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function LemonProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterInvestment, setFilterInvestment] = useState("all");
  const [sortBy, setSortBy] = useState("name");

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
    const prompt = `Give me in-depth business information about ${productName}. Include step-by-step execution plan, investment breakdown, risk factors, legal process, and future market opportunity according to Indian Market.`;
    navigate("/Idea", { state: { prompt } });
  };

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter((product) => {
      const matchesSearch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDifficulty = filterDifficulty === "all" || product.difficulty_level === filterDifficulty;
      
      const matchesInvestment = filterInvestment === "all" || 
        (filterInvestment === "low" && product.initial_investment.includes("1-3")) ||
        (filterInvestment === "medium" && (product.initial_investment.includes("3-6") || product.initial_investment.includes("4-7"))) ||
        (filterInvestment === "high" && (product.initial_investment.includes("10-15") || product.initial_investment.includes("8-15")));
      
      return matchesSearch && matchesDifficulty && matchesInvestment;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.product_name.localeCompare(b.product_name);
        case "investment":
          return parseFloat(a.initial_investment.match(/\d+/)[0]) - parseFloat(b.initial_investment.match(/\d+/)[0]);
        case "roi":
          return parseFloat(b.roi.match(/\d+/)[0]) - parseFloat(a.roi.match(/\d+/)[0]);
        case "difficulty":
          const difficultyOrder = { "Easy": 1, "Medium": 2, "Hard": 3 };
          return difficultyOrder[a.difficulty_level] - difficultyOrder[b.difficulty_level];
        default:
          return 0;
      }
    });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "#28a745";
      case "Medium": return "#ffc107";
      case "Hard": return "#dc3545";
      default: return "#6c757d";
    }
  };

  const getInvestmentRange = (investment) => {
    if (investment.includes("1-3") || investment.includes("50,000")) return "Low";
    if (investment.includes("3-6") || investment.includes("4-7") || investment.includes("2-5")) return "Medium";
    if (investment.includes("10-15") || investment.includes("8-15")) return "High";
    return "Variable";
  };

  if (loading) return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p>Loading lemon products...</p>
    </div>
  );
  
  if (error) return (
    <div className={styles.errorContainer}>
      <p>Error: {error}</p>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>🍋 Lemon Business Opportunities</h2>
        <p className={styles.subheading}>Discover 24+ profitable lemon-based business ideas</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search products or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchBar}
          />
        </div>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <Filter size={16} />
            <select 
              value={filterDifficulty} 
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <DollarSign size={16} />
            <select 
              value={filterInvestment} 
              onChange={(e) => setFilterInvestment(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Investments</option>
              <option value="low">Low (₹1-3L)</option>
              <option value="medium">Medium (₹3-7L)</option>
              <option value="high">High (₹8L+)</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <TrendingUp size={16} />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="name">Sort by Name</option>
              <option value="investment">Sort by Investment</option>
              <option value="roi">Sort by ROI</option>
              <option value="difficulty">Sort by Difficulty</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{filteredAndSortedProducts.length}</span>
          <span className={styles.statLabel}>Products Found</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{products.length}</span>
          <span className={styles.statLabel}>Total Products</span>
        </div>
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <div className={styles.noResults}>
          <p>No matching products found. Try adjusting your filters.</p>
        </div>
      )}

      <ul className={styles.productList}>
        {filteredAndSortedProducts.map((product, index) => (
          <li key={product._id} className={styles.card}>
            <div className={styles.titleRow} onClick={() => toggleExpand(index)}>
              <div className={styles.titleInfo}>
                <h3>{product.product_name}</h3>
                <div className={styles.quickStats}>
                  <span 
                    className={styles.difficultyBadge}
                    style={{ backgroundColor: getDifficultyColor(product.difficulty_level) }}
                  >
                    {product.difficulty_level}
                  </span>
                  <span className={styles.investmentBadge}>
                    {getInvestmentRange(product.initial_investment)}
                  </span>
                  <span className={styles.roiBadge}>
                    ROI: {product.roi}
                  </span>
                </div>
              </div>
              {expandedIndex === index ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
            </div>
            
            {expandedIndex === index && (
              <div className={styles.details}>
                <div className={styles.description}>
                  <h4>📝 Description</h4>
                  <p>{product.description}</p>
                </div>

                <div className={styles.keyInfo}>
                  <div className={styles.infoSection}>
                    <h4>💰 Investment & Returns</h4>
                    <p><strong>Initial Investment:</strong> {product.initial_investment}</p>
                    <p><strong>ROI:</strong> {product.roi}</p>
                  </div>

                  <div className={styles.infoSection}>
                    <h4>📋 Requirements</h4>
                    <p><strong>Difficulty Level:</strong> {product.difficulty_level}</p>
                    <p><strong>Legal Requirements:</strong> {product.legal_requirements?.join(", ")}</p>
                    <p><strong>Government Schemes:</strong> {product.govt_schemes?.join(", ")}</p>
                  </div>

                  <div className={styles.infoSection}>
                    <h4>📍 Location & Market</h4>
                    <p><strong>Best Locations:</strong> {product.location_suitability?.join(", ")}</p>
                    <p><strong>Target Market:</strong> {product.target_market?.join(", ")}</p>
                  </div>
                </div>

                {product.budget_breakdown && (
                  <div className={styles.budgetSection}>
                    <h4>💰 Budget Breakdown</h4>
                    <div className={styles.budgetGrid}>
                      {Object.entries(product.budget_breakdown).map(([key, value]) => (
                        <div key={key} className={styles.budgetItem}>
                          <span className={styles.budgetLabel}>{key.replace(/_/g, ' ')}</span>
                          <span className={styles.budgetValue}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className={styles.detailedInfo}>
                  <div className={styles.infoSection}>
                    <h4>⚖️ Legal Details</h4>
                    <p>{product.law_details}</p>
                  </div>

                  <div className={styles.infoSection}>
                    <h4>📋 License Process</h4>
                    <p>{product.license_process}</p>
                  </div>

                  <div className={styles.infoSection}>
                    <h4>🏛️ Government Scheme Details</h4>
                    <p>{product.govt_scheme_details}</p>
                  </div>
                </div>

                <button
                  className={styles.geminiButton}
                  onClick={() => handleGeminiClick(product.product_name)}
                >
                  <Sparkles size={16} /> Get Detailed Business Plan
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
