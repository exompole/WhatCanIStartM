import { useState } from "react";
import axios from "axios";

const IdeaGenerator = () => {
  const [input, setInput] = useState("");
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);

  const generateIdea = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/gemini/generateidea", {
  prompt: `Suggest a business idea based on: ${input}`,
});

      setIdea(res.data.result);
    } catch (err) {
      console.error(err);
      setIdea("Failed to generate idea");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>AI Business Idea Generator</h2>
      <textarea
        rows="5"
        style={{ width: "100%" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your skills or available resources"
      />
      <br />
      <button onClick={generateIdea} disabled={loading}>
        {loading ? "Generating..." : "Get Idea"}
      </button>
      <div style={{ marginTop: "20px" }}>
        <h3>Generated Idea:</h3>
        <p>{idea}</p>
      </div>
    </div>
  );
};

export default IdeaGenerator;
