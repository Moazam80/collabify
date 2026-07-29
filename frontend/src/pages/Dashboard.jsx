const stats = [
  { label: "My Projects", value: 3, icon: "📁", color: "var(--color-primary)" },
  { label: "Joined Projects", value: 2, icon: "🤝", color: "var(--color-secondary)" },
  { label: "Pending Requests", value: 4, icon: "📨", color: "var(--color-warning)" },
  { label: "Followers", value: 128, icon: "👥", color: "var(--color-success)" },
];

function Dashboard() {
  return (
    <div>
      <h1 style={{ fontSize: "var(--font-size-h2)", fontWeight: "700", marginBottom: "8px" }}>
        Welcome back, Ayesha 👋
      </h1>
      <p style={{ fontSize: "var(--font-size-base)", color: "var(--color-text-secondary)", marginBottom: "32px" }}>
        Here's what's happening with your projects.
      </p>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "var(--radius-sm)",
                background: "var(--color-background-alt)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                flexShrink: 0,
              }}
            >
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: "var(--font-size-h3)", fontWeight: "700", color: stat.color }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)" }}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;