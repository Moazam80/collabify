import { Link } from "react-router-dom";
function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${encodeURIComponent(project.title)}`}
      style={{
        background: "var(--color-background)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        padding: "20px",
        textAlign: "left",
        display: "block",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
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
        <span
          style={{
            fontSize: "var(--font-size-caption)",
            color: "var(--color-success)",
          }}
        >
          ● {project.status}
        </span>
      </div>

      {/* Title + Description */}
      <h3 style={{ fontSize: "var(--font-size-h4)", marginBottom: "8px" }}>
        {project.title}
      </h3>
      <p
        style={{
          fontSize: "var(--font-size-small)",
          color: "var(--color-text-secondary)",
          marginBottom: "16px",
        }}
      >
        {project.description}
      </p>

      {/* Skills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "16px",
        }}
      >
        {project.skills.map((skill) => (
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

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "var(--font-size-small)",
          color: "var(--color-text-secondary)",
        }}
      >
        <span>👤 {project.owner}</span>
        <span>
          👥 {project.teamCount}/{project.maxTeamSize}
        </span>
      </div>
    </Link>
  );
}

export default ProjectCard;