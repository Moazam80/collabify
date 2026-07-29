import { NavLink } from "react-router-dom";

const sidebarLinks = [
  { label: "Overview", icon: "🏠", path: "/dashboard" },
  { label: "My Projects", icon: "📁", path: "/dashboard/my-projects" },
  { label: "Joined Projects", icon: "🤝", path: "/dashboard/joined" },
  { label: "Join Requests", icon: "📨", path: "/dashboard/requests" },
  { label: "Recent Activity", icon: "🕓", path: "/dashboard/activity" },
];

function Sidebar() {
  return (
    <div
      style={{
        width: "240px",
        borderRight: "1px solid var(--color-border)",
        padding: "24px 16px",
        flexShrink: 0,
      }}
    >
      {sidebarLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          end={link.path === "/dashboard"}
          style={({ isActive }) => ({
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 12px",
            borderRadius: "var(--radius-sm)",
            marginBottom: "4px",
            fontSize: "var(--font-size-small)",
            fontWeight: "600",
            background: isActive ? "var(--color-primary-light)" : "transparent",
            color: isActive ? "var(--color-primary)" : "var(--color-text-secondary)",
          })}
        >
          <span>{link.icon}</span>
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;