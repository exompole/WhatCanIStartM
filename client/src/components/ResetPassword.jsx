
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const res = await axios.post(`http://localhost:5000/api/reset-password/${token}`, { password });
      setMessage(res.data.message);
      
      // Clear password field on success
      if (res.data.message === "Password reset successfully.") {
        setPassword("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error resetting password");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8, background: "#fafafa" }}>
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Reset Password</h2>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 16, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <button type="submit" disabled={loading} style={{ width: "100%", padding: 10, borderRadius: 4, background: "#f7c948", border: "none", fontWeight: "bold" }}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        {message && <div style={{ color: "green", marginTop: 16 }}>{message}</div>}
        {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
      </form>
    </div>
  );
};

export default ResetPassword;
