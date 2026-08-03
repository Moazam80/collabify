import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function JoinedProjects() {
  const { user } = useAuth();
  const [joinedProjects, setJoinedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJoined() {
      try {
        const response = await api.get("/projects");
        const allProjects = response.data.projects;
        const joined = [];

        for (const project of allProjects) {
          if (project.owner._id !== user.id) {
            const teamRes = await api.get(`/projects/${project._id}/team`);
            if (teamRes.data.members.some((m) => m.user._id === user.id)) {
              joined.push(project);
            }
          }
        }
        setJoinedProjects(joined);
      } catch (error) {
        console.error("Failed to load joined projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchJoined();
  }, [user]);

  return (
    <div>
      <h1 style={{ fontSize: "var(--font-size-h2)", fontWeight: "700", marginBottom: "24px" }}>
        Joined Projects
      </h1>

      {loading ? (
        <p style={{ textAlign: "center", color: "var(--color-text-secondary)" }}>Loading...</p>
      ) : joinedProjects.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          {joinedProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "48px 0", color: "var(--color-text-secondary)" }}>
          <p style={{ marginBottom: "16px" }}>You haven't joined any projects yet.</p>
          <Link to="/projects" style={{ background: "var(--color-primary)", color: "#fff", padding: "10px 20px", borderRadius: "var(--radius-sm)", fontWeight: "600" }}>
            Browse Projects
          </Link>
        </div>
      )}
    </div>
  );
}

export default JoinedProjects;