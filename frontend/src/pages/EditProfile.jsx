import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { getImageUrl } from "../utils/getImageUrl";

function EditProfile() {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
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
  const [profilePicture, setProfilePicture] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadingPicture, setUploadingPicture] = useState(false);
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
        setProfilePicture(user.profilePicture || "");
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

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }
  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  async function handleUploadPicture() {
    if (!selectedFile) return;

    setUploadingPicture(true);
    const uploadData = new FormData();
    uploadData.append("profilePicture", selectedFile);

    try {
     const response = await api.post("/users/me/picture", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfilePicture(response.data.user.profilePicture);
      updateUser({ profilePicture: response.data.user.profilePicture });
      setSelectedFile(null);
      setPreviewUrl("");
    } catch (error) {
      console.error("Failed to upload picture:", error);
    } finally {
      setUploadingPicture(false);
    }
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

          <div style={{ marginBottom: "24px", textAlign: "center" }}>
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "var(--color-primary-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px auto",
                overflow: "hidden",
                fontSize: "28px",
                fontWeight: "700",
                color: "var(--color-primary)",
              }}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : profilePicture ? (
                <img
                  src={getImageUrl(profilePicture)}
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                formData.name.charAt(0)
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ fontSize: "var(--font-size-caption)", marginBottom: "8px" }}
            />

            {selectedFile && (
              <div>
                <button
                  type="button"
                  onClick={handleUploadPicture}
                  disabled={uploadingPicture}
                  style={{
                    background: "var(--color-primary)",
                    color: "#fff",
                    padding: "6px 16px",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "var(--font-size-caption)",
                    fontWeight: "600",
                    marginTop: "8px",
                  }}
                >
                  {uploadingPicture ? "Uploading..." : "Upload Picture"}
                </button>
              </div>
            )}
          </div>
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