import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) return;
    setLoading(true);
    await signup(name, email, password);
    setLoading(false);
    navigate("/");
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    background: "#1a1a1a",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    marginBottom: "16px",
  };

  return (
    <>
    <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="mt-4 ml-4">
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#aaa",
            padding: "8px 18px",
            borderRadius: "8px",
            fontSize: "13px",
            cursor: "pointer",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          ← Back
        </button>
      </div>
    <div style={{
      minHeight: "100vh",
      background: "#070708",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        background: "#0e0e10",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "16px",
        padding: "48px",
        width: "100%",
        maxWidth: "420px",
      }}>
        <h1 style={{ fontSize: "24px", color: "#fff", marginBottom: "8px", fontWeight: "600" }}>
          Create account
        </h1>
        <p style={{ color: "#555", fontSize: "14px", marginBottom: "32px" }}>
          Sign up to start shopping
        </p>

        <label style={{ display: "block", fontSize: "13px", color: "#888", marginBottom: "8px" }}>
          Full Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <label style={{ display: "block", fontSize: "13px", color: "#888", marginBottom: "8px" }}>
          Email
        </label>
        <input
          type="email"
          placeholder="you@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <label style={{ display: "block", fontSize: "13px", color: "#888", marginBottom: "8px" }}>
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          style={{
            width: "100%",
            padding: "13px",
            background: "#7c5cfc",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "500",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            marginBottom: "16px",
          }}
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        <p style={{ color: "#555", fontSize: "13px", textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#7c5cfc", textDecoration: "none" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}