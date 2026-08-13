import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-background)",
        flexWrap: "wrap",
        gap: "12px",
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
        {user && (
          <Link to="/dashboard" style={{ color: "var(--color-text-secondary)" }}>
            Dashboard
          </Link>
        )}
      </div>

      {/* Auth Section */}
      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <NotificationBell />
          <Link
            to="/profile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--color-text-primary)",
              fontWeight: "600",
              fontSize: "var(--font-size-small)",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "var(--color-primary-light)",
                color: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "var(--font-size-caption)",
              }}
            >
              {user.name.charAt(0)}
            </div>
            {user.name}
          </Link>
          <button
            onClick={handleLogout}
            style={{
              color: "var(--color-danger)",
              fontWeight: "600",
              fontSize: "var(--font-size-small)",
            }}
          >
            Logout
          </button>
        </div>
      ) : (
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
      )}
    </nav>
  );
}

export default Navbar;