import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./IdeaPage.module.css";
import { marked } from "marked";

const IdeaPage = () => {
  const [input, setInput] = useState("");
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);

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
        prompt: `Suggest a business idea based on: ${promptToSend}`,
      });
      setIdea(res.data.result);
    } catch (err) {
      console.error(err);
      setIdea("❌ Failed to generate idea.");
    } finally {
      setLoading(false);
    }
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
          placeholder="Enter your skills, interests, or available resources..."
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
            <h3>Your Generated Idea:</h3>
            <div
              dangerouslySetInnerHTML={{ __html: marked(idea) }}
              className={styles.markdown}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaPage;
