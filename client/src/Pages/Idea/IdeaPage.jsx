import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./IdeaPage.module.css";
import { marked } from "marked";

const IdeaPage = () => {
  const [input, setInput] = useState("");
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState({}); // For collapsible sections

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.prompt) {
      setInput(location.state.prompt);
      generateIdea(location.state.prompt);
    }
  }, [location.state]);

  const generateIdea = async (promptText) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("⚠️ Please login first to use the idea generator.");
      navigate("/user-login");
      return;
    }

    const promptToSend = promptText || input;
    if (!promptToSend.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/gemini/generateidea", {
        prompt: `
        Give me a detailed business plan for: ${promptToSend}
        Include the following:
        1. 📋 Executive Summary
        2. 💰 Budget with itemized costs
        3. ⚖️ Legal/Licensing Requirements
        4. 🛠️ Step-by-step Implementation Plan
        5. 📣 Marketing Strategy
        6. 🚧 Risks & Mitigation
        7. 📈 Scalability Potential
        Format the answer in markdown for easy parsing.
        `,
      });
      setIdea(res.data.result);
    } catch (err) {
      console.error(err);
      setIdea("❌ Failed to generate idea.");
    } finally {
      setLoading(false);
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

        {idea && (
          <div className={styles.resultBox}>
            <h3>📊 Generated Business Plan</h3>
            {renderSections(idea)}
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaPage;
