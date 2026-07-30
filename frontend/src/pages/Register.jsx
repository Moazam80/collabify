import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      console.log("Registered:", response.data);
      setLoading(false);
      // Real redirect to login/dashboard will be refined in Step 14.3
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  }

  const inputStyle = {
    width: "100%",
    height: "44px",
    padding: "12px 16px",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-sm)",
    fontSize: "var(--font-size-base)",
  };

  const labelStyle = {
    display: "block",
    fontSize: "var(--font-size-small)",
    fontWeight: "600",
    marginBottom: "6px",
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "80px 24px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "400px",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            padding: "32px",
          }}
        >
          <h2
            style={{
              fontSize: "var(--font-size-h3)",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            Create Your Collabify Account
          </h2>

          {error && (
            <div
              style={{
                background: "#FEE2E2",
                border: "1px solid var(--color-danger)",
                color: "#991B1B",
                padding: "12px 16px",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--font-size-small)",
                marginBottom: "16px",
              }}
            >
              ⚠ {error}
            </div>
          )}

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="John Doe"
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="you@example.com"
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="••••••••"
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "var(--color-primary)",
              color: "#fff",
              padding: "12px",
              borderRadius: "var(--radius-sm)",
              fontWeight: "600",
              fontSize: "var(--font-size-base)",
              marginBottom: "16px",
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p
            style={{
              textAlign: "center",
              fontSize: "var(--font-size-small)",
              color: "var(--color-text-secondary)",
            }}
          >
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--color-primary)", fontWeight: "600" }}>
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;