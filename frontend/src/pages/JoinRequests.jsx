import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function JoinRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllRequests();
  }, [user]);

  async function fetchAllRequests() {
    try {
      const response = await api.get("/projects");
      const myProjects = response.data.projects.filter((p) => p.owner._id === user.id);

      let allRequests = [];
      for (const project of myProjects) {
        const reqRes = await api.get(`/projects/${project._id}/join-requests`);
        const withProjectInfo = reqRes.data.requests.map((r) => ({
          ...r,
          projectTitle: project.title,
          projectId: project._id,
        }));
        allRequests = [...allRequests, ...withProjectInfo];
      }
      setRequests(allRequests);
    } catch (error) {
      console.error("Failed to load requests:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAccept(requestId) {
    try {
      await api.put(`/join-requests/${requestId}/accept`);
      fetchAllRequests();
    } catch (error) {
      console.error("Failed to accept:", error);
    }
  }

  async function handleReject(requestId) {
    try {
      await api.put(`/join-requests/${requestId}/reject`);
      fetchAllRequests();
    } catch (error) {
      console.error("Failed to reject:", error);
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: "var(--font-size-h2)", fontWeight: "700", marginBottom: "24px" }}>
        Join Requests
      </h1>

      {loading ? (
        <p style={{ textAlign: "center", color: "var(--color-text-secondary)" }}>Loading...</p>
      ) : requests.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {requests.map((request) => (
            <div key={request._id} style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "20px" }}>
              <div style={{ marginBottom: "8px" }}>
                <p style={{ fontSize: "var(--font-size-base)", fontWeight: "600" }}>{request.user.name}</p>
                <Link
                  to={`/projects/${request.projectId}`}
                  style={{ fontSize: "var(--font-size-caption)", color: "var(--color-primary)" }}
                >
                  wants to join {request.projectTitle}
                </Link>
              </div>

              {request.message && (
                <p style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", marginBottom: "16px" }}>
                  {request.message}
                </p>
              )}

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleAccept(request._id)}
                  style={{ background: "var(--color-success)", color: "#fff", padding: "8px 18px", borderRadius: "var(--radius-sm)", fontWeight: "600", fontSize: "var(--font-size-small)" }}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request._id)}
                  style={{ background: "transparent", border: "1px solid var(--color-danger)", color: "var(--color-danger)", padding: "8px 18px", borderRadius: "var(--radius-sm)", fontWeight: "600", fontSize: "var(--font-size-small)" }}
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