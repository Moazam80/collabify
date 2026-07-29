import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    // Real email-sending logic will be connected in Phase 12+
    setSubmitted(true);
  }

  const inputStyle = {
    width: "100%",
    height: "44px",
    padding: "12px 16px",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-sm)",
    fontSize: "var(--font-size-base)",
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
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            padding: "32px",
          }}
        >
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <h2
                style={{
                  fontSize: "var(--font-size-h3)",
                  marginBottom: "8px",
                  textAlign: "center",
                }}
              >
                Forgot Password
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-small)",
                  color: "var(--color-text-secondary)",
                  textAlign: "center",
                  marginBottom: "24px",
                }}
              >
                Enter your email and we'll send you a reset link.
              </p>

              <div style={{ marginBottom: "24px" }}>
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
                  style={inputStyle}
                  placeholder="you@example.com"
                />
              </div>

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
                }}
              >
                Send Reset Link
              </button>
            </form>
          ) : (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>✅</div>
              <h2 style={{ fontSize: "var(--font-size-h3)", marginBottom: "8px" }}>
                Check Your Email
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-small)",
                  color: "var(--color-text-secondary)",
                }}
              >
                We've sent a password reset link to <strong>{email}</strong>.
              </p>
            </div>
          )}

          <p
            style={{
              textAlign: "center",
              fontSize: "var(--font-size-small)",
              color: "var(--color-text-secondary)",
              marginTop: "16px",
            }}
          >
            Remember your password?{" "}
            <Link to="/login" style={{ color: "var(--color-primary)", fontWeight: "600" }}>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;