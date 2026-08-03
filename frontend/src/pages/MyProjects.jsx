import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function MyProjects() {
  const { user } = useAuth();
  const [myProjects, setMyProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyProjects() {
      try {
        const response = await api.get("/projects");
        const filtered = response.data.projects.filter((p) => p.owner._id === user.id);
        setMyProjects(filtered);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMyProjects();
  }, [user]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "var(--font-size-h2)", fontWeight: "700" }}>My Projects</h1>
        <Link
          to="/projects/create"
          style={{
            background: "var(--color-primary)",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "var(--radius-sm)",
            fontWeight: "600",
            fontSize: "var(--font-size-small)",
          }}
        >
          + Create Project
        </Link>
      </div>

      {loading ? (
        <p style={{ textAlign: "center", color: "var(--color-text-secondary)" }}>Loading...</p>
      ) : myProjects.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          {myProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "48px 0", color: "var(--color-text-secondary)" }}>
          <p style={{ marginBottom: "16px" }}>You haven't created any projects yet.</p>
          <Link
            to="/projects/create"
            style={{ background: "var(--color-primary)", color: "#fff", padding: "10px 20px", borderRadius: "var(--radius-sm)", fontWeight: "600" }}
          >
            Create Your First Project
          </Link>
        </div>
      )}
    </div>
  );
}

export default MyProjects;