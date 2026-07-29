import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    console.log("Password reset to:", password);
    // Real reset logic (with token) will be connected in Phase 15
    setSuccess(true);
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
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            padding: "32px",
          }}
        >
          {!success ? (
            <form onSubmit={handleSubmit}>
              <h2
                style={{
                  fontSize: "var(--font-size-h3)",
                  marginBottom: "8px",
                  textAlign: "center",
                }}
              >
                Reset Your Password
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-small)",
                  color: "var(--color-text-secondary)",
                  textAlign: "center",
                  marginBottom: "24px",
                }}
              >
                Choose a new password for your account.
              </p>

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
                <label style={labelStyle}>New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={inputStyle}
                  placeholder="••••••••"
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={labelStyle}>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={inputStyle}
                  placeholder="••••••••"
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
                Reset Password
              </button>
            </form>
          ) : (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>✅</div>
              <h2 style={{ fontSize: "var(--font-size-h3)", marginBottom: "8px" }}>
                Password Reset Successful
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-small)",
                  color: "var(--color-text-secondary)",
                  marginBottom: "20px",
                }}
              >
                You can now log in with your new password.
              </p>
              <Link
                to="/login"
                style={{
                  background: "var(--color-primary)",
                  color: "#fff",
                  padding: "10px 24px",
                  borderRadius: "var(--radius-sm)",
                  fontWeight: "600",
                  display: "inline-block",
                }}
              >
                Go to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;