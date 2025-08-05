import { useState, useEffect } from "react";
import { geminiAPI } from "../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./IdeaPage.module.css";
import { marked } from "marked";

const IdeaPage = () => {
  const [input, setInput] = useState("");
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const [expanded, setExpanded] = useState({}); // For collapsible sections

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (location.state?.prompt) {
      setInput(location.state.prompt);
      generateIdea(location.state.prompt);
    }
  }, [location.state]);

  const generateIdea = async (promptText) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert(" Please login first to use the idea generator.");
      navigate("/user-login");
      return;
    }

    const promptToSend = promptText || input;
    if (!promptToSend.trim()) return;

    setLoading(true);
    setShowTimeoutWarning(false);
    
    // Show timeout warning after 15 seconds
    const timeoutWarning = setTimeout(() => {
      setShowTimeoutWarning(true);
    }, 15000);

    try {
      const res = await geminiAPI.generateIdea(`
        Create a comprehensive business plan for: ${promptToSend} according Indian Market 
        
        Please provide detailed information in the following sections:
        
        1.  **Executive Summary**
           - Business concept overview
           - Unique value proposition
           - Target market size and opportunity
           - Competitive advantage
        
        2.  **Financial Planning & Budget**
           - Startup costs breakdown (equipment, licenses, marketing, etc.)
           - Monthly operational expenses
           - Revenue projections for first 12 months
           - Break-even analysis
           - Funding requirements and sources
        
        3.  **Legal & Regulatory Requirements**
           - Required business registrations (GST, MSME, etc.)
           - Industry-specific licenses and permits
           - Compliance requirements
           - Insurance needs
           - Tax obligations
        
        4.  **Step-by-Step Implementation Plan**
           - Phase 1: Setup and preparation (1-3 months)
           - Phase 2: Launch and initial operations (3-6 months)
           - Phase 3: Growth and scaling (6-12 months)
           - Key milestones and timelines
           - Resource requirements at each phase
        
        5.  **Marketing & Sales Strategy**
           - Target customer segments
           - Marketing channels (digital, traditional, local)
           - Brand positioning and messaging
           - Sales process and customer acquisition
           - Pricing strategy
           - Customer retention strategies
        
        6.  **Risk Analysis & Mitigation**
           - Market risks and solutions
           - Operational risks and contingency plans
           - Financial risks and safeguards
           - Regulatory risks and compliance measures
           - Technology risks (if applicable)
        
        7.  **Growth & Scalability Potential**
           - Expansion opportunities
           - Diversification possibilities
           - Franchising potential
           - Technology integration opportunities
           - Long-term growth projections
        
        8.  **Visual & Media References**
           - YouTube video links for similar businesses
           - Instagram/Facebook business examples
           - Pinterest inspiration boards
           - Industry-specific websites and resources
           - Equipment and setup photos references
        
        9.  **Equipment & Technology Requirements**
           - Essential equipment list with estimated costs
           - Software and technology needs
           - Space and infrastructure requirements
           - Supplier recommendations
        
        10.  **Team & Skills Required**
            - Key roles and responsibilities
            - Required skills and qualifications
            - Training needs
            - Outsourcing opportunities
        
        11.  **Market Analysis**
            - Industry trends and growth potential
            - Competitor analysis
            - Market gaps and opportunities
            - Seasonal considerations
            - Geographic market potential
        
        12. 💡 **Innovation & Differentiation**
            - Unique selling points
            - Innovation opportunities
            - Technology integration possibilities
            - Sustainability aspects
            - Future-proofing strategies
        
        Please format the response in clear markdown with proper headings, bullet points, and sections. Include practical, actionable advice that someone can immediately implement. Provide specific examples, case studies, and real-world references where possible.
        `);
      
      clearTimeout(timeoutWarning);
      setIdea(res.data.result);
    } catch (err) {
      clearTimeout(timeoutWarning);
      console.error('Idea generation error:', err);
      
      let errorMessage = "Failed to generate idea.";
      
      if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
        errorMessage = " Request timed out. The AI is taking longer than expected. Please try again.";
      } else if (err.response?.status === 408) {
        errorMessage = " AI service timeout. Please try again with a simpler request.";
      } else if (err.response?.status === 429) {
        errorMessage = " Too many requests. Please wait a moment and try again.";
      } else if (err.response?.status === 500) {
        errorMessage = " Server error. Please try again later.";
      } else if (err.response?.data?.error) {
        errorMessage = ` ${err.response.data.error}`;
      }
      
      setIdea(errorMessage);
    } finally {
      setLoading(false);
      setShowTimeoutWarning(false);
    }
  };

  const toggleSection = (title) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // Split into sections
  const renderSections = (markdown) => {
    const rawSections = markdown.split(/^###\s+/gm).filter(Boolean);
    return rawSections.map((section, index) => {
      const [titleLine, ...rest] = section.split("\n");
      const title = titleLine.trim();
      const content = rest.join("\n");

      return (
        <div key={index} className={styles.section}>
          <div
            className={styles.sectionHeader}
            onClick={() => toggleSection(title)}
          >
            <span>{expanded[title] ? "▼" : "▶"} {title}</span>
          </div>
          {expanded[title] && (
            <div
              className={styles.sectionBody}
              dangerouslySetInnerHTML={{ __html: marked(content) }}
            />
          )}
        </div>
      );
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.heading}>💡 AI Startup Idea Generator</h1>
        <textarea
          className={styles.textarea}
          rows="6"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your idea, e.g. 'Lemon Oil Extraction'"
        />
        <button
          className={styles.button}
          onClick={() => generateIdea()}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Idea"}
        </button>

        {showTimeoutWarning && (
          <div className={styles.timeoutWarning}>
             The AI is taking longer than expected. Please try again or
            simplify your request.
          </div>
        )}

        {idea && (
          <div className={styles.resultBox}>
            <h3>Generated Business Plan</h3>
            {renderSections(idea)}
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaPage;
