// Dummy data — in Phase 17, this will be generated automatically from real events
const activities = [
  {
    id: 1,
    icon: "✅",
    text: "Hamza T. accepted your request to join Expense Tracker App",
    timeAgo: "2 hours ago",
  },
  {
    id: 2,
    icon: "📨",
    text: "Sara M. requested to join AI Recipe Generator",
    timeAgo: "5 hours ago",
  },
  {
    id: 3,
    icon: "❤️",
    text: "Bilal R. liked your post",
    timeAgo: "1 day ago",
  },
  {
    id: 4,
    icon: "💬",
    text: "Zainab A. commented on your post",
    timeAgo: "1 day ago",
  },
  {
    id: 5,
    icon: "🤝",
    text: "You joined Expense Tracker App",
    timeAgo: "3 days ago",
  },
];

function Activity() {
  return (
    <div>
      <h1 style={{ fontSize: "var(--font-size-h2)", fontWeight: "700", marginBottom: "24px" }}>
        Recent Activity
      </h1>

      {activities.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {activities.map((activity) => (
            <div
              key={activity.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "16px",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "var(--color-background-alt)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                {activity.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "var(--font-size-small)" }}>{activity.text}</p>
                <p
                  style={{
                    fontSize: "var(--font-size-caption)",
                    color: "var(--color-text-secondary)",
                    marginTop: "2px",
                  }}
                >
                  {activity.timeAgo}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "48px 0", color: "var(--color-text-secondary)" }}>
          <p>No recent activity yet.</p>
        </div>
      )}
    </div>
  );
}

export default Activity;