import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <h1 style={{ fontSize: "48px", color: "var(--color-primary)" }}>404</h1>
      <h3>This page doesn't exist</h3>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: "24px" }}>
        The page you're looking for may have been moved or deleted.
      </p>
      <Link
        to="/"
        style={{
          background: "var(--color-primary)",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;