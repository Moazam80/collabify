import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-background)",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          fontSize: "var(--font-size-h3)",
          fontWeight: "700",
          color: "var(--color-primary)",
        }}
      >
        Collabify
      </Link>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: "24px" }}>
        <Link to="/projects" style={{ color: "var(--color-text-secondary)" }}>
          Projects
        </Link>
        <Link to="/feed" style={{ color: "var(--color-text-secondary)" }}>
          Feed
        </Link>
      </div>

      {/* Auth Buttons */}
      <div style={{ display: "flex", gap: "12px" }}>
        <Link
          to="/login"
          style={{
            color: "var(--color-primary)",
            padding: "10px 16px",
            fontWeight: "600",
          }}
        >
          Login
        </Link>
        <Link
          to="/register"
          style={{
            background: "var(--color-primary)",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "600",
          }}
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;