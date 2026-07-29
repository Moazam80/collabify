import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function CreateProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Web App",
    maxTeamSize: 5,
  });
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setError("");

    if (skills.length === 0) {
      setError("Please add at least one required skill.");
      return;
    }

    setLoading(true);
    const newProject = { ...formData, skills };
    console.log("New project created:", newProject);

    // Real save logic (API call) will be connected in Phase 14
    setTimeout(() => {
      setLoading(false);
      navigate("/projects");
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
            Create a New Project
          </h2>

          {error && (
            <div
              style={{
                background: "#FEE2E2",
                border: "1px solid var(--color-danger)",
                color: "#991B1B",
                padding: "12px 16px",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--font-size-small)",
                marginBottom: "16px",
              }}
            >
              ⚠ {error}
            </div>
          )}

          {/* Title */}
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="e.g. AI Recipe Generator"
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              style={{ ...inputStyle, resize: "vertical" }}
              placeholder="What is this project about?"
            />
          </div>

          {/* Category */}
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

          {/* Skills Tag Input */}
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

            {/* Skill Tags */}
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

          {/* Max Team Size */}
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
            {loading ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;