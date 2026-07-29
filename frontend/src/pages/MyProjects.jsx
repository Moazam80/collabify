import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

// Dummy data — projects owned by the current logged-in user ("Ayesha K.")
// In Phase 14, this will be fetched from the API filtered by owner
const myProjects = [
  {
    title: "AI Recipe Generator",
    category: "AI/ML",
    status: "Active",
    description: "An app that suggests recipes based on ingredients you have at home.",
    skills: ["Python", "React", "UI/UX"],
    owner: "Ayesha K.",
    teamCount: 2,
    maxTeamSize: 5,
  },
  {
    title: "Portfolio Website Builder",
    category: "Design Tool",
    status: "Completed",
    description: "A drag-and-drop tool for freelancers to build portfolio websites.",
    skills: ["React", "Figma"],
    owner: "Ayesha K.",
    teamCount: 3,
    maxTeamSize: 3,
  },
];

function MyProjects() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
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

      {myProjects.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {myProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "48px 0", color: "var(--color-text-secondary)" }}>
          <p style={{ marginBottom: "16px" }}>You haven't created any projects yet.</p>
          <Link
            to="/projects/create"
            style={{
              background: "var(--color-primary)",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "var(--radius-sm)",
              fontWeight: "600",
            }}
          >
            Create Your First Project
          </Link>
        </div>
      )}
    </div>
  );
}

export default MyProjects;