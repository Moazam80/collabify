import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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

function getNotificationText(notification) {
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
      return "New notification";
  }
}

function getNotificationLink(notification) {
  if (notification.project) return `/projects/${notification.project._id}`;
  if (notification.post) return "/feed";
  return "#";
}

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function fetchNotifications() {
    try {
      const response = await api.get("/notifications");
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Failed to load notifications:", error);
    }
  }

  async function handleMarkAllAsRead() {
    try {
      await api.put("/notifications/read-all");
      setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  }

  async function handleNotificationClick(notification) {
    if (!notification.isRead) {
      try {
        await api.put(`/notifications/${notification._id}/read`);
        setNotifications(
          notifications.map((n) => (n._id === notification._id ? { ...n, isRead: true } : n))
        );
      } catch (error) {
        console.error("Failed to mark as read:", error);
      }
    }
    setIsOpen(false);
  }

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ position: "relative", fontSize: "20px", padding: "4px" }}
      >
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              background: "var(--color-danger)",
              color: "#fff",
              fontSize: "10px",
              fontWeight: "700",
              borderRadius: "999px",
              minWidth: "16px",
              height: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 3px",
            }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "36px",
            width: "320px",
            maxHeight: "400px",
            overflowY: "auto",
            background: "var(--color-background)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 100,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <span style={{ fontWeight: "600", fontSize: "var(--font-size-small)" }}>Notifications</span>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                style={{ fontSize: "var(--font-size-caption)", color: "var(--color-primary)", fontWeight: "600" }}
              >
                Mark all as read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <p style={{ padding: "24px 16px", textAlign: "center", color: "var(--color-text-secondary)", fontSize: "var(--font-size-small)" }}>
              No notifications yet.
            </p>
          ) : (
            notifications.map((notification) => (
              <Link
                key={notification._id}
                to={getNotificationLink(notification)}
                onClick={() => handleNotificationClick(notification)}
                style={{
                  display: "block",
                  padding: "12px 16px",
                  borderBottom: "1px solid var(--color-border)",
                  background: notification.isRead ? "transparent" : "var(--color-primary-light)",
                }}
              >
                <p style={{ fontSize: "var(--font-size-small)" }}>{getNotificationText(notification)}</p>
                <p style={{ fontSize: "var(--font-size-caption)", color: "var(--color-text-secondary)", marginTop: "2px" }}>
                  {timeAgo(notification.createdAt)}
                </p>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;