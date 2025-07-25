
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/forgot-password", { email });
      setMessage(res.data.message);
      
      // If reset link is provided (when email is not configured)
      if (res.data.resetLink) {
        setMessage(`${res.data.message} Reset link: ${res.data.resetLink}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset link");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8, background: "#fafafa" }}>
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Forgot Password</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          style={{ width: "100%", padding: 8, marginBottom: 16, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <button type="submit" disabled={loading} style={{ width: "100%", padding: 10, borderRadius: 4, background: "#f7c948", border: "none", fontWeight: "bold" }}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        {message && <div style={{ color: "green", marginTop: 16 }}>{message}</div>}
        {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
      </form>
    </div>
  );
};

export default ForgotPassword;
