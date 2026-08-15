import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { getImageUrl } from "../utils/getImageUrl";

const dummyUserProjects = [
  {
    title: "Portfolio Website Builder",
    category: "Design Tool",
    status: "Completed",
    description: "A drag-and-drop tool for freelancers to build portfolio websites.",
    skillsRequired: ["React", "Figma"],
    owner: { name: "You" },
    maxTeamSize: 3,
  },
];

function Profile() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  const isOwnProfile = !userId || (currentUser && userId === currentUser.id);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const endpoint = isOwnProfile ? "/users/me" : `/users/${userId}`;
        const response = await api.get(endpoint);
        const fetchedUser = response.data.user;
        setProfileUser(fetchedUser);

        const statusRes = await api.get(`/users/${fetchedUser._id}/follow-status`);
        setFollowerCount(statusRes.data.followerCount);
        setIsFollowing(statusRes.data.isFollowing);
      } catch (error) {
        console.error("Failed to load profile:", error);
        setProfileUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [userId, isOwnProfile]);

  async function handleFollowToggle() {
    try {
      if (isFollowing) {
        await api.delete(`/users/${profileUser._id}/follow`);
        setFollowerCount(followerCount - 1);
      } else {
        await api.post(`/users/${profileUser._id}/follow`);
        setFollowerCount(followerCount + 1);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Failed to toggle follow:", error);
    }
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: "center", padding: "80px" }}>Loading profile...</div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: "center", padding: "80px" }}>
          {isOwnProfile ? "Please log in to view your profile." : "User not found."}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            flexWrap: "wrap",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            padding: "32px",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "var(--color-primary-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: "700",
              color: "var(--color-primary)",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            {profileUser.profilePicture ? (
              <img
                src={getImageUrl(profileUser.profilePicture)}
                alt={profileUser.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              profileUser.name.charAt(0)
            )}
          </div>

          <div style={{ flex: 1, minWidth: "200px" }}>
            <h1 style={{ fontSize: "var(--font-size-h2)", fontWeight: "700", marginBottom: "8px" }}>
              {profileUser.name}
            </h1>
            <p style={{ fontSize: "var(--font-size-base)", color: "var(--color-text-secondary)", marginBottom: "16px" }}>
              {profileUser.bio || "No bio added yet."}
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              {profileUser.githubUrl && (
                <a href={profileUser.githubUrl} target="_blank" rel="noreferrer" style={{ fontSize: "var(--font-size-small)", color: "var(--color-primary)", fontWeight: "600" }}>
                  GitHub
                </a>
              )}
              {profileUser.linkedinUrl && (
                <a href={profileUser.linkedinUrl} target="_blank" rel="noreferrer" style={{ fontSize: "var(--font-size-small)", color: "var(--color-primary)", fontWeight: "600" }}>
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "var(--font-size-h3)", fontWeight: "700" }}>{followerCount}</div>
            <div style={{ fontSize: "var(--font-size-caption)", color: "var(--color-text-secondary)" }}>Followers</div>
          </div>
        </div>

        {isOwnProfile ? (
          <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
            <Link
              to="/profile/edit"
              style={{
                background: "var(--color-primary)",
                color: "#fff",
                padding: "10px 24px",
                borderRadius: "var(--radius-sm)",
                fontWeight: "600",
                fontSize: "var(--font-size-small)",
                display: "inline-block",
              }}
            >
              Edit Profile
            </Link>
          </div>
        ) : currentUser ? (
          <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleFollowToggle}
              style={{
                background: isFollowing ? "transparent" : "var(--color-primary)",
                border: isFollowing ? "1px solid var(--color-border)" : "none",
                color: isFollowing ? "var(--color-text-primary)" : "#fff",
                padding: "10px 24px",
                borderRadius: "var(--radius-sm)",
                fontWeight: "600",
                fontSize: "var(--font-size-small)",
              }}
            >
              {isFollowing ? "✓ Following" : "+ Follow"}
            </button>
          </div>
        ) : null}

        <div style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "24px", marginTop: "24px" }}>
          <h3 style={{ fontSize: "var(--font-size-h4)", fontWeight: "600", marginBottom: "16px" }}>Skills</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {profileUser.skills && profileUser.skills.length > 0 ? (
              profileUser.skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    background: "var(--color-primary-light)",
                    color: "var(--color-primary)",
                    padding: "6px 14px",
                    borderRadius: "999px",
                    fontSize: "var(--font-size-small)",
                    fontWeight: "600",
                  }}
                >
                  {skill}
                </span>
              ))
            ) : (
              <p style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)" }}>
                No skills added yet.
              </p>
            )}
          </div>
        </div>

        {isOwnProfile && (
          <div style={{ marginTop: "24px" }}>
            <h3 style={{ fontSize: "var(--font-size-h4)", fontWeight: "600", marginBottom: "16px" }}>
              Project Portfolio
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
              {dummyUserProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;