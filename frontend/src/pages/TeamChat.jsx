import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function TeamChat() {
  const { id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await api.get(`/projects/${id}`);
        setProject(response.data.project);
      } catch (error) {
        console.error("Failed to load project:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(e) {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Placeholder — real-time sending will be connected in Step 16.4
    setMessages([...messages, { id: Date.now(), sender: user.name, text: newMessage, isMine: true }]);
    setNewMessage("");
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: "center", padding: "80px" }}>Loading chat...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: "center", padding: "80px 24px" }}>
          <h2>Project not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "24px" }}>
        <Link
          to={`/projects/${id}`}
          style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", marginBottom: "16px", display: "inline-block" }}
        >
          ← Back to {project.title}
        </Link>

        <div
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            display: "flex",
            flexDirection: "column",
            height: "500px",
          }}
        >
          {/* Chat Header */}
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)" }}>
            <h2 style={{ fontSize: "var(--font-size-h4)", fontWeight: "700" }}>{project.title} — Team Chat</h2>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {messages.length === 0 ? (
              <p style={{ textAlign: "center", color: "var(--color-text-secondary)", fontSize: "var(--font-size-small)", marginTop: "40px" }}>
                No messages yet. Say hello to your team!
              </p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: msg.isMine ? "flex-end" : "flex-start",
                    maxWidth: "70%",
                  }}
                >
                  {!msg.isMine && (
                    <p style={{ fontSize: "var(--font-size-caption)", color: "var(--color-text-secondary)", marginBottom: "2px" }}>
                      {msg.sender}
                    </p>
                  )}
                  <div
                    style={{
                      background: msg.isMine ? "var(--color-primary)" : "var(--color-background-alt)",
                      color: msg.isMine ? "#fff" : "var(--color-text-primary)",
                      padding: "10px 14px",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "var(--font-size-small)",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{ display: "flex", gap: "8px", padding: "16px 20px", borderTop: "1px solid var(--color-border)" }}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "10px 14px",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--font-size-small)",
              }}
            />
            <button
              type="submit"
              style={{
                background: "var(--color-primary)",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "var(--radius-sm)",
                fontWeight: "600",
                fontSize: "var(--font-size-small)",
              }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TeamChat;