import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

// Same dummy data as Projects.jsx — in Phase 14 this comes from one shared API/database
const allProjects = [
  {
    title: "AI Recipe Generator",
    category: "AI/ML",
    status: "Active",
    description: "An app that suggests recipes based on ingredients you have at home.",
    skills: ["Python", "React", "UI/UX"],
    owner: "Ayesha K.",
    teamCount: 2,
    maxTeamSize: 5,
    teamMembers: [
      { name: "Ayesha K.", role: "Project Owner" },
      { name: "Hamza T.", role: "Python Developer" },
    ],
  },
  {
    title: "Campus Event Finder",
    category: "Web App",
    status: "Active",
    description: "A platform for students to discover and RSVP to campus events.",
    skills: ["React", "Node.js"],
    owner: "Bilal R.",
    teamCount: 3,
    maxTeamSize: 4,
    teamMembers: [
      { name: "Bilal R.", role: "Project Owner" },
      { name: "Sara M.", role: "Frontend Developer" },
      { name: "Zainab A.", role: "Backend Developer" },
    ],
  },
  {
    title: "Freelance Portfolio Builder",
    category: "Design Tool",
    status: "Active",
    description: "A drag-and-drop tool for freelancers to build portfolio websites.",
    skills: ["UI/UX", "React", "Figma"],
    owner: "Sara M.",
    teamCount: 1,
    maxTeamSize: 3,
    teamMembers: [{ name: "Sara M.", role: "Project Owner" }],
  },
  {
    title: "Expense Tracker App",
    category: "Mobile App",
    status: "Active",
    description: "A simple mobile app to track daily expenses and set budgets.",
    skills: ["React Native", "Node.js"],
    owner: "Hamza T.",
    teamCount: 2,
    maxTeamSize: 4,
    teamMembers: [
      { name: "Hamza T.", role: "Project Owner" },
      { name: "Ayesha K.", role: "UI Designer" },
    ],
  },
  {
    title: "Local Business Directory",
    category: "Web App",
    status: "Completed",
    description: "A directory site to help people discover local small businesses.",
    skills: ["React", "MongoDB"],
    owner: "Zainab A.",
    teamCount: 4,
    maxTeamSize: 4,
    teamMembers: [
      { name: "Zainab A.", role: "Project Owner" },
      { name: "Bilal R.", role: "Backend Developer" },
      { name: "Sara M.", role: "Frontend Developer" },
      { name: "Hamza T.", role: "QA Tester" },
    ],
  },
];

function ProjectDetails() {
  const { title } = useParams();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const project = allProjects.find((p) => p.title === decodeURIComponent(title));

  // MVP mock check: assume logged-in user is "Ayesha K." (real auth comes in Phase 15)
  const currentUser = "Ayesha K.";
  const isOwner = project && project.owner === currentUser;

  function handleDelete() {
    console.log("Project deleted:", project.title);
    // Real delete API call will be connected in Phase 14
    navigate("/projects");
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
          style={{
            fontSize: "var(--font-size-small)",
            color: "var(--color-text-secondary)",
            marginBottom: "16px",
            display: "inline-block",
          }}
        >
          ← Back to Projects
        </Link>

        <div
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            padding: "32px",
          }}
        >
          {/* Category + Status */}
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

          {/* Title */}
          <h1 style={{ fontSize: "var(--font-size-h2)", fontWeight: "700", marginBottom: "12px" }}>
            {project.title}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "var(--font-size-base)",
              color: "var(--color-text-secondary)",
              marginBottom: "24px",
            }}
          >
            {project.description}
          </p>

          {/* Skills */}
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "var(--font-size-small)", fontWeight: "600", marginBottom: "10px" }}>
              Skills Needed
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
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
          </div>

          {/* Owner + Team */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "var(--font-size-small)",
              color: "var(--color-text-secondary)",
              marginBottom: "24px",
            }}
          >
            <span>👤 Created by {project.owner}</span>
            <span>👥 {project.teamCount}/{project.maxTeamSize} members</span>
          </div>

          {/* Team Members List */}
          <div
            style={{
              marginBottom: "24px",
              paddingBottom: "24px",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <h3 style={{ fontSize: "var(--font-size-small)", fontWeight: "600", marginBottom: "10px" }}>
              Team Members
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {project.teamMembers.map((member) => (
                <div
                  key={member.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
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
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontSize: "var(--font-size-small)", fontWeight: "600" }}>
                      {member.name}
                    </p>
                    <p style={{ fontSize: "var(--font-size-caption)", color: "var(--color-text-secondary)" }}>
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Join Button */}
          {isOwner ? (
            <div style={{ display: "flex", gap: "12px" }}>
              <Link
                to={`/projects/${encodeURIComponent(project.title)}/edit`}
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
              onClick={() => {
                console.log("Join request sent for:", project.title);
                setRequestSent(true);
              }}
            >
              {requestSent ? "✓ Request Sent" : "Request to Join"}
            </button>
          )}

          {/* Delete Confirmation */}
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