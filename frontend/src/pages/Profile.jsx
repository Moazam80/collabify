import Navbar from "../components/Navbar";

const dummyUser = {
  name: "Ayesha Khan",
  bio: "Frontend developer passionate about building clean, user-friendly interfaces.",
  avatar: "AK",
  githubUrl: "https://github.com/ayeshak",
  linkedinUrl: "https://linkedin.com/in/ayeshak",
  projectsCompleted: 4,
  projectsInProgress: 2,
};

function Profile() {
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
            }}
          >
            {dummyUser.avatar}
          </div>

          <div style={{ flex: 1, minWidth: "200px" }}>
            <h1 style={{ fontSize: "var(--font-size-h2)", fontWeight: "700", marginBottom: "8px" }}>
              {dummyUser.name}
            </h1>
            <p style={{ fontSize: "var(--font-size-base)", color: "var(--color-text-secondary)", marginBottom: "16px" }}>
              {dummyUser.bio}
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <a href={dummyUser.githubUrl} target="_blank" rel="noreferrer" style={{ fontSize: "var(--font-size-small)", color: "var(--color-primary)", fontWeight: "600" }}>
                GitHub
              </a>
              <a href={dummyUser.linkedinUrl} target="_blank" rel="noreferrer" style={{ fontSize: "var(--font-size-small)", color: "var(--color-primary)", fontWeight: "600" }}>
                LinkedIn
              </a>
            </div>
          </div>

          <div style={{ display: "flex", gap: "24px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "var(--font-size-h3)", fontWeight: "700", color: "var(--color-primary)" }}>
                {dummyUser.projectsCompleted}
              </div>
              <div style={{ fontSize: "var(--font-size-caption)", color: "var(--color-text-secondary)" }}>
                Completed
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "var(--font-size-h3)", fontWeight: "700", color: "var(--color-secondary)" }}>
                {dummyUser.projectsInProgress}
              </div>
              <div style={{ fontSize: "var(--font-size-caption)", color: "var(--color-text-secondary)" }}>
                In Progress
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;