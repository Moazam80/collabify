import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Same dummy data — Phase 14 mein ye ek shared database se aayega
const allProjects = [
  {
    title: "AI Recipe Generator",
    category: "AI/ML",
    description: "An app that suggests recipes based on ingredients you have at home.",
    skills: ["Python", "React", "UI/UX"],
    maxTeamSize: 5,
  },
  {
    title: "Campus Event Finder",
    category: "Web App",
    description: "A platform for students to discover and RSVP to campus events.",
    skills: ["React", "Node.js"],
    maxTeamSize: 4,
  },
  {
    title: "Freelance Portfolio Builder",
    category: "Design Tool",
    description: "A drag-and-drop tool for freelancers to build portfolio websites.",
    skills: ["UI/UX", "React", "Figma"],
    maxTeamSize: 3,
  },
  {
    title: "Expense Tracker App",
    category: "Mobile App",
    description: "A simple mobile app to track daily expenses and set budgets.",
    skills: ["React Native", "Node.js"],
    maxTeamSize: 4,
  },
  {
    title: "Local Business Directory",
    category: "Web App",
    description: "A directory site to help people discover local small businesses.",
    skills: ["React", "MongoDB"],
    maxTeamSize: 4,
  },
];

function EditProject() {
  const { title } = useParams();
  const navigate = useNavigate();
  const existingProject = allProjects.find((p) => p.title === decodeURIComponent(title));

  const [formData, setFormData] = useState(
    existingProject || { title: "", description: "", category: "Web App", maxTeamSize: 5 }
  );
  const [skills, setSkills] = useState(existingProject ? existingProject.skills : []);
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = ["Web App", "Mobile App", "AI/ML", "Design Tool"];

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleAddSkill(e) {
    e.preventDefault();
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  }

  function handleRemoveSkill(skillToRemove) {
    setSkills(skills.filter((s) => s !== skillToRemove));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log("Project updated:", { ...formData, skills });

    // Real update API call will be connected in Phase 14
    setTimeout(() => {
      setLoading(false);
      navigate(`/projects/${encodeURIComponent(formData.title)}`);
    }, 1000);
  }

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-sm)",
    fontSize: "var(--font-size-base)",
    fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block",
    fontSize: "var(--font-size-small)",
    fontWeight: "600",
    marginBottom: "6px",
  };

  if (!existingProject) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: "center", padding: "80px 24px" }}>
          <h2>Project not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center", padding: "48px 24px" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "500px",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            padding: "32px",
          }}
        >
          <h2 style={{ fontSize: "var(--font-size-h3)", marginBottom: "24px" }}>
            Edit Project
          </h2>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{ ...inputStyle, background: "var(--color-background)" }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Skills Needed</label>
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddSkill(e);
                }}
                style={inputStyle}
                placeholder="e.g. React"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                style={{
                  background: "var(--color-primary)",
                  color: "#fff",
                  padding: "0 20px",
                  borderRadius: "var(--radius-sm)",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                }}
              >
                Add
              </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    background: "var(--color-primary-light)",
                    color: "var(--color-primary)",
                    padding: "6px 10px",
                    borderRadius: "999px",
                    fontSize: "var(--font-size-small)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    style={{ color: "var(--color-primary)", fontWeight: "700" }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Max Team Size</label>
            <select
              name="maxTeamSize"
              value={formData.maxTeamSize}
              onChange={handleChange}
              style={{ ...inputStyle, background: "var(--color-background)" }}
            >
              {[2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} members
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "var(--color-primary)",
              color: "#fff",
              padding: "12px",
              borderRadius: "var(--radius-sm)",
              fontWeight: "600",
              fontSize: "var(--font-size-base)",
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProject;