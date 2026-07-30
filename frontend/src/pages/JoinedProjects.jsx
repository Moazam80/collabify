import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

// Dummy data — projects where "Ayesha K." is a team member (not owner)
// In Phase 14, this will be fetched from the API filtered by TeamMember records
const joinedProjects = [
  {
    title: "Expense Tracker App",
    category: "Mobile App",
    status: "Active",
    description: "A simple mobile app to track daily expenses and set budgets.",
    skills: ["React Native", "Node.js"],
    owner: "Hamza T.",
    teamCount: 2,
    maxTeamSize: 4,
  },
];

function JoinedProjects() {
  return (
    <div>
      <h1 style={{ fontSize: "var(--font-size-h2)", fontWeight: "700", marginBottom: "24px" }}>
        Joined Projects
      </h1>

      {joinedProjects.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {joinedProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "48px 0", color: "var(--color-text-secondary)" }}>
          <p style={{ marginBottom: "16px" }}>You haven't joined any projects yet.</p>
          <Link
            to="/projects"
            style={{
              background: "var(--color-primary)",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "var(--radius-sm)",
              fontWeight: "600",
            }}
          >
            Browse Projects
          </Link>
        </div>
      )}
    </div>
  );
}

export default JoinedProjects;