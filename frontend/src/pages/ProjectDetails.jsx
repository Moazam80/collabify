import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [joinError, setJoinError] = useState("");

  const isOwner = user && project && project.owner._id === user.id;
  const isMember = user && teamMembers.some((m) => m.user._id === user.id);

  useEffect(() => {
    loadProjectData();
  }, [id]);

  async function loadProjectData() {
    setLoading(true);
    try {
      const projectRes = await api.get(`/projects/${id}`);
      setProject(projectRes.data.project);

      const teamRes = await api.get(`/projects/${id}/team`);
      setTeamMembers(teamRes.data.members);

      if (user && projectRes.data.project.owner._id === user.id) {
        const requestsRes = await api.get(`/projects/${id}/join-requests`);
        setJoinRequests(requestsRes.data.requests);
      }
    } catch (error) {
      console.error("Failed to load project data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleJoinRequest() {
    setJoinError("");
    try {
      await api.post(`/projects/${id}/join-requests`, { message: "" });
      setRequestSent(true);
    } catch (err) {
      setJoinError(err.response?.data?.message || "Failed to send request.");
    }
  }

  async function handleAccept(requestId) {
    try {
      await api.put(`/join-requests/${requestId}/accept`);
      loadProjectData();
    } catch (error) {
      console.error("Failed to accept request:", error);
    }
  }

  async function handleReject(requestId) {
    try {
      await api.put(`/join-requests/${requestId}/reject`);
      loadProjectData();
    } catch (error) {
      console.error("Failed to reject request:", error);
    }
  }

  async function handleRemoveMember(memberUserId) {
    try {
      await api.delete(`/projects/${id}/team/${memberUserId}`);
      loadProjectData();
    } catch (error) {
      console.error("Failed to remove member:", error);
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/projects/${id}`);
      navigate("/projects");
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: "center", padding: "80px" }}>Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: "center", padding: "80px 24px" }}>
          <h2>Project not found</h2>
          <Link to="/projects" style={{ color: "var(--color-primary)" }}>
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "40px 24px" }}>
        <Link
          to="/projects"
          style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", marginBottom: "16px", display: "inline-block" }}
        >
          ← Back to Projects
        </Link>

        <div style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <span
              style={{
                background: "var(--color-primary-light)",
                color: "var(--color-primary)",
                fontSize: "var(--font-size-caption)",
                padding: "4px 10px",
                borderRadius: "999px",
              }}
            >
              {project.category}
            </span>
            <span style={{ fontSize: "var(--font-size-caption)", color: "var(--color-success)" }}>
              ● {project.status}
            </span>
          </div>

          <h1 style={{ fontSize: "var(--font-size-h2)", fontWeight: "700", marginBottom: "12px" }}>
            {project.title}
          </h1>

          <p style={{ fontSize: "var(--font-size-base)", color: "var(--color-text-secondary)", marginBottom: "24px" }}>
            {project.description}
          </p>

          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "var(--font-size-small)", fontWeight: "600", marginBottom: "10px" }}>
              Skills Needed
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {(project.skillsRequired || []).map((skill) => (
                <span
                  key={skill}
                  style={{
                    background: "var(--color-background-alt)",
                    border: "1px solid var(--color-border)",
                    fontSize: "var(--font-size-caption)",
                    padding: "4px 10px",
                    borderRadius: "999px",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "var(--font-size-small)",
              color: "var(--color-text-secondary)",
              marginBottom: "24px",
            }}
          >
            <span>👤 Created by {project.owner.name}</span>
            <span>👥 {teamMembers.length}/{project.maxTeamSize} members</span>
          </div>

          {/* Team Members List */}
          <div
            style={{
              marginBottom: "24px",
              paddingBottom: "24px",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <h3 style={{ fontSize: "var(--font-size-small)", fontWeight: "600" }}>Team Members</h3>
              {(isOwner || isMember) && (
                <Link to={`/projects/${id}/chat`} style={{ fontSize: "var(--font-size-caption)", color: "var(--color-primary)", fontWeight: "600" }}>
                  💬 Open Team Chat
                </Link>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
                    fontSize: "var(--font-size-caption)",
                    fontWeight: "700",
                    flexShrink: 0,
                  }}
                >
                  {project.owner.name.charAt(0)}
                </div>
                <div>
                  <Link to={`/profile/${project.owner._id}`} style={{ fontSize: "var(--font-size-small)", fontWeight: "600" }}>
                    {project.owner.name}
                  </Link>
                  <p style={{ fontSize: "var(--font-size-caption)", color: "var(--color-text-secondary)" }}>
                    Project Owner
                  </p>
                </div>
              </div>

              {teamMembers.map((member) => (
                <div
                  key={member._id}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
                        fontSize: "var(--font-size-caption)",
                        fontWeight: "700",
                        flexShrink: 0,
                      }}
                    >
                      {member.user.name.charAt(0)}
                    </div>
                   <div>
                      <Link to={`/profile/${member.user._id}`} style={{ fontSize: "var(--font-size-small)", fontWeight: "600" }}>
                        {member.user.name}
                      </Link>
                      <p style={{ fontSize: "var(--font-size-caption)", color: "var(--color-text-secondary)" }}>
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {isOwner && (
                    <button
                      onClick={() => handleRemoveMember(member.user._id)}
                      style={{ fontSize: "var(--font-size-caption)", color: "var(--color-danger)", fontWeight: "600" }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Join Requests — owner only */}
          {isOwner && joinRequests.length > 0 && (
            <div style={{ marginBottom: "24px", paddingBottom: "24px", borderBottom: "1px solid var(--color-border)" }}>
              <h3 style={{ fontSize: "var(--font-size-small)", fontWeight: "600", marginBottom: "10px" }}>
                Pending Join Requests
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {joinRequests.map((request) => (
                  <div key={request._id} style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", padding: "12px" }}>
                    <p style={{ fontSize: "var(--font-size-small)", fontWeight: "600", marginBottom: "4px" }}>
                      {request.user.name}
                    </p>
                    {request.message && (
                      <p style={{ fontSize: "var(--font-size-caption)", color: "var(--color-text-secondary)", marginBottom: "10px" }}>
                        {request.message}
                      </p>
                    )}
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => handleAccept(request._id)}
                        style={{ background: "var(--color-success)", color: "#fff", padding: "6px 14px", borderRadius: "var(--radius-sm)", fontSize: "var(--font-size-caption)", fontWeight: "600" }}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(request._id)}
                        style={{ background: "transparent", border: "1px solid var(--color-danger)", color: "var(--color-danger)", padding: "6px 14px", borderRadius: "var(--radius-sm)", fontSize: "var(--font-size-caption)", fontWeight: "600" }}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isOwner ? (
            <div style={{ display: "flex", gap: "12px" }}>
              <Link
                to={`/projects/${project._id}/edit`}
                style={{ flex: 1, textAlign: "center", background: "var(--color-primary)", color: "#fff", padding: "14px", borderRadius: "var(--radius-sm)", fontWeight: "600", fontSize: "var(--font-size-base)" }}
              >
                Edit Project
              </Link>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                style={{ flex: 1, background: "transparent", border: "1px solid var(--color-danger)", color: "var(--color-danger)", padding: "14px", borderRadius: "var(--radius-sm)", fontWeight: "600", fontSize: "var(--font-size-base)" }}
              >
                Delete Project
              </button>
            </div>
          ) : isMember ? (
            <div style={{ textAlign: "center", padding: "14px", background: "var(--color-background-alt)", borderRadius: "var(--radius-sm)", fontWeight: "600", fontSize: "var(--font-size-small)" }}>
              ✓ You're a team member
            </div>
          ) : (
            <>
              <button
                disabled={requestSent}
                style={{
                  width: "100%",
                  background: requestSent ? "var(--color-success)" : "var(--color-primary)",
                  color: "#fff",
                  padding: "14px",
                  borderRadius: "var(--radius-sm)",
                  fontWeight: "600",
                  fontSize: "var(--font-size-base)",
                  cursor: requestSent ? "default" : "pointer",
                }}
                onClick={handleJoinRequest}
              >
                {requestSent ? "✓ Request Sent" : "Request to Join"}
              </button>
              {joinError && (
                <p style={{ color: "var(--color-danger)", fontSize: "var(--font-size-small)", marginTop: "8px", textAlign: "center" }}>
                  {joinError}
                </p>
              )}
            </>
          )}

          {showDeleteConfirm && (
            <div style={{ marginTop: "16px", background: "#FEE2E2", border: "1px solid var(--color-danger)", borderRadius: "var(--radius-sm)", padding: "16px" }}>
              <p style={{ fontSize: "var(--font-size-small)", color: "#991B1B", marginBottom: "12px" }}>
                Are you sure you want to delete this project? This cannot be undone.
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={handleDelete}
                  style={{ background: "var(--color-danger)", color: "#fff", padding: "8px 16px", borderRadius: "var(--radius-sm)", fontWeight: "600", fontSize: "var(--font-size-small)" }}
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  style={{ background: "transparent", border: "1px solid var(--color-border)", padding: "8px 16px", borderRadius: "var(--radius-sm)", fontWeight: "600", fontSize: "var(--font-size-small)" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;