import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    skills: "",
    githubUrl: "",
    linkedinUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get("/users/me");
        const user = response.data.user;
        setFormData({
          name: user.name || "",
          bio: user.bio || "",
          skills: (user.skills || []).join(", "),
          githubUrl: user.githubUrl || "",
          linkedinUrl: user.linkedinUrl || "",
        });
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setFetching(false);
      }
    }
    fetchProfile();
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const skillsArray = formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      await api.put("/users/me", { ...formData, skills: skillsArray });
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      console.error("Failed to update profile:", error);
    }
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

  if (fetching) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: "center", padding: "80px" }}>Loading...</div>
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
          <h2 style={{ fontSize: "var(--font-size-h3)", marginBottom: "24px" }}>Edit Profile</h2>

          {success && (
            <div
              style={{
                background: "#DCFCE7",
                border: "1px solid var(--color-success)",
                color: "#166534",
                padding: "12px 16px",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--font-size-small)",
                marginBottom: "16px",
              }}
            >
              ✅ Profile updated successfully.
            </div>
          )}

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={inputStyle} />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} style={{ ...inputStyle, resize: "vertical" }} />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Skills (comma-separated)</label>
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} style={inputStyle} placeholder="React, Python, Figma" />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>GitHub URL</label>
            <input type="url" name="githubUrl" value={formData.githubUrl} onChange={handleChange} style={inputStyle} />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>LinkedIn URL</label>
            <input type="url" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} style={inputStyle} />
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                background: "var(--color-primary)",
                color: "#fff",
                padding: "12px",
                borderRadius: "var(--radius-sm)",
                fontWeight: "600",
                fontSize: "var(--font-size-base)",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/profile")}
              style={{
                flex: 1,
                background: "transparent",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
                padding: "12px",
                borderRadius: "var(--radius-sm)",
                fontWeight: "600",
                fontSize: "var(--font-size-base)",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;