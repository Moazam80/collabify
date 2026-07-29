import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
    // Real login logic will be connected in Phase 14
  }

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
            Log In to Collabify
          </h2>

          {/* Email Field */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "var(--font-size-small)",
                fontWeight: "600",
                marginBottom: "6px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                height: "44px",
                padding: "12px 16px",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--font-size-base)",
              }}
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "var(--font-size-small)",
                fontWeight: "600",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                height: "44px",
                padding: "12px 16px",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--font-size-base)",
              }}
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              background: "var(--color-primary)",
              color: "#fff",
              padding: "12px",
              borderRadius: "var(--radius-sm)",
              fontWeight: "600",
              fontSize: "var(--font-size-base)",
              marginBottom: "16px",
            }}
          >
            Log In
          </button>

          <p
            style={{
              textAlign: "center",
              fontSize: "var(--font-size-small)",
              color: "var(--color-text-secondary)",
            }}
          >
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "var(--color-primary)", fontWeight: "600" }}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;