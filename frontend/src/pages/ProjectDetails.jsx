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
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

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

  const isOwner = user && project && project.owner._id === user.id;

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
              {project.skillsRequired.map((skill) => (
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
              paddingBottom: "24px",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <span>👤 Created by {project.owner.name}</span>
            <span>👥 Max {project.maxTeamSize} members</span>
          </div>

          {isOwner ? (
            <div style={{ display: "flex", gap: "12px" }}>
              <Link
                to={`/projects/${project._id}/edit`}
                style={{
                  flex: 1,
                  textAlign: "center",
                  background: "var(--color-primary)",
                  color: "#fff",
                  padding: "14px",
                  borderRadius: "var(--radius-sm)",
                  fontWeight: "600",
                  fontSize: "var(--font-size-base)",
                }}
              >
                Edit Project
              </Link>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "1px solid var(--color-danger)",
                  color: "var(--color-danger)",
                  padding: "14px",
                  borderRadius: "var(--radius-sm)",
                  fontWeight: "600",
                  fontSize: "var(--font-size-base)",
                }}
              >
                Delete Project
              </button>
            </div>
          ) : (
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
              onClick={() => setRequestSent(true)}
            >
              {requestSent ? "✓ Request Sent" : "Request to Join"}
            </button>
          )}

          {showDeleteConfirm && (
            <div
              style={{
                marginTop: "16px",
                background: "#FEE2E2",
                border: "1px solid var(--color-danger)",
                borderRadius: "var(--radius-sm)",
                padding: "16px",
              }}
            >
              <p style={{ fontSize: "var(--font-size-small)", color: "#991B1B", marginBottom: "12px" }}>
                Are you sure you want to delete this project? This cannot be undone.
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={handleDelete}
                  style={{
                    background: "var(--color-danger)",
                    color: "#fff",
                    padding: "8px 16px",
                    borderRadius: "var(--radius-sm)",
                    fontWeight: "600",
                    fontSize: "var(--font-size-small)",
                  }}
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--color-border)",
                    padding: "8px 16px",
                    borderRadius: "var(--radius-sm)",
                    fontWeight: "600",
                    fontSize: "var(--font-size-small)",
                  }}
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