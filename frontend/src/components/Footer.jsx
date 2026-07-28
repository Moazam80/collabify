import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        padding: "48px 24px 24px 24px",
        background: "var(--color-text-primary)",
        color: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "32px",
          maxWidth: "1000px",
          margin: "0 auto 32px auto",
        }}
      >
        {/* Brand */}
        <div>
          <h3 style={{ fontSize: "var(--font-size-h4)", marginBottom: "8px" }}>
            Collabify
          </h3>
          <p
            style={{
              fontSize: "var(--font-size-small)",
              color: "#9CA3AF",
              maxWidth: "240px",
            }}
          >
            Where Skills Meet Ideas.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4
            style={{
              fontSize: "var(--font-size-small)",
              marginBottom: "12px",
              color: "#9CA3AF",
            }}
          >
            PLATFORM
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Link to="/projects" style={{ fontSize: "var(--font-size-small)" }}>
              Browse Projects
            </Link>
            <Link to="/feed" style={{ fontSize: "var(--font-size-small)" }}>
              Social Feed
            </Link>
            <Link to="/register" style={{ fontSize: "var(--font-size-small)" }}>
              Sign Up
            </Link>
          </div>
        </div>

        {/* Account */}
        <div>
          <h4
            style={{
              fontSize: "var(--font-size-small)",
              marginBottom: "12px",
              color: "#9CA3AF",
            }}
          >
            ACCOUNT
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Link to="/login" style={{ fontSize: "var(--font-size-small)" }}>
              Login
            </Link>
            <Link to="/register" style={{ fontSize: "var(--font-size-small)" }}>
              Create Account
            </Link>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #374151",
          paddingTop: "16px",
          textAlign: "center",
          fontSize: "var(--font-size-caption)",
          color: "#9CA3AF",
        }}
      >
        © {new Date().getFullYear()} Collabify. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;