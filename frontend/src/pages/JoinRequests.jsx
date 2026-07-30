import { useState } from "react";
import { Link } from "react-router-dom";

// Dummy data — join requests across all of "Ayesha K."'s owned projects
// In Phase 14, this will be fetched from the API filtered by project owner
const initialRequests = [
  {
    id: 1,
    projectTitle: "AI Recipe Generator",
    name: "Sara M.",
    message: "I'd love to help with the UI/UX design!",
  },
  {
    id: 2,
    projectTitle: "AI Recipe Generator",
    name: "Zainab A.",
    message: "I have React experience and would like to join.",
  },
  {
    id: 3,
    projectTitle: "Portfolio Website Builder",
    name: "Bilal R.",
    message: "Interested in contributing as a backend developer.",
  },
];

function JoinRequests() {
  const [requests, setRequests] = useState(initialRequests);

  function handleAccept(id) {
    console.log("Accepted request:", id);
    setRequests(requests.filter((r) => r.id !== id));
  }

  function handleReject(id) {
    console.log("Rejected request:", id);
    setRequests(requests.filter((r) => r.id !== id));
  }

  return (
    <div>
      <h1 style={{ fontSize: "var(--font-size-h2)", fontWeight: "700", marginBottom: "24px" }}>
        Join Requests
      </h1>

      {requests.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {requests.map((request) => (
            <div
              key={request.id}
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "8px",
                }}
              >
                <div>
                  <p style={{ fontSize: "var(--font-size-base)", fontWeight: "600" }}>
                    {request.name}
                  </p>
                  <Link
                    to={`/projects/${encodeURIComponent(request.projectTitle)}`}
                    style={{
                      fontSize: "var(--font-size-caption)",
                      color: "var(--color-primary)",
                    }}
                  >
                    wants to join {request.projectTitle}
                  </Link>
                </div>
              </div>

              <p
                style={{
                  fontSize: "var(--font-size-small)",
                  color: "var(--color-text-secondary)",
                  marginBottom: "16px",
                }}
              >
                {request.message}
              </p>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleAccept(request.id)}
                  style={{
                    background: "var(--color-success)",
                    color: "#fff",
                    padding: "8px 18px",
                    borderRadius: "var(--radius-sm)",
                    fontWeight: "600",
                    fontSize: "var(--font-size-small)",
                  }}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--color-danger)",
                    color: "var(--color-danger)",
                    padding: "8px 18px",
                    borderRadius: "var(--radius-sm)",
                    fontWeight: "600",
                    fontSize: "var(--font-size-small)",
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "48px 0", color: "var(--color-text-secondary)" }}>
          <p>No pending requests.</p>
          <p style={{ fontSize: "var(--font-size-small)", marginTop: "8px" }}>
            Requests to join your projects will show up here.
          </p>
        </div>
      )}
    </div>
  );
}

export default JoinRequests;