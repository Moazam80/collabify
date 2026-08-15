import { useState, useEffect } from "react";
import api from "../services/api";

function timeAgo(dateString) {
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function getActivityIcon(type) {
  switch (type) {
    case "join_request":
      return "📨";
    case "request_accepted":
      return "✅";
    case "like":
      return "❤️";
    case "comment":
      return "💬";
    case "follow":
      return "🤝";
    default:
      return "🔔";
  }
}

function getActivityText(notification) {
  const senderName = notification.sender?.name || "Someone";
  switch (notification.type) {
    case "join_request":
      return `${senderName} requested to join ${notification.project?.title || "your project"}`;
    case "request_accepted":
      return `Your request to join ${notification.project?.title || "a project"} was accepted`;
    case "like":
      return `${senderName} liked your post`;
    case "comment":
      return `${senderName} commented on your post`;
    case "follow":
      return `${senderName} started following you`;
    default:
      return "New activity";
  }
}

function Activity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const response = await api.get("/notifications");
        setActivities(response.data.notifications);
      } catch (error) {
        console.error("Failed to load activity:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchActivity();
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: "var(--font-size-h2)", fontWeight: "700", marginBottom: "24px" }}>
        Recent Activity
      </h1>

      {loading ? (
        <p style={{ textAlign: "center", color: "var(--color-text-secondary)" }}>Loading...</p>
      ) : activities.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {activities.map((activity) => (
            <div
              key={activity._id}
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
                {getActivityIcon(activity.type)}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "var(--font-size-small)" }}>{getActivityText(activity)}</p>
                <p style={{ fontSize: "var(--font-size-caption)", color: "var(--color-text-secondary)", marginTop: "2px" }}>
                  {timeAgo(activity.createdAt)}
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