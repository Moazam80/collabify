import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

const dummyUser = {
  name: "Ayesha Khan",
  bio: "Frontend developer passionate about building clean, user-friendly interfaces.",
  avatar: "AK",
  githubUrl: "https://github.com/ayeshak",
  linkedinUrl: "https://linkedin.com/in/ayeshak",
  projectsCompleted: 4,
  projectsInProgress: 2,
  skills: ["React", "JavaScript", "UI/UX Design", "Figma", "CSS", "Node.js"],
  education: [
    { school: "University of Punjab", degree: "BS Computer Science", year: "2022 - 2026" },
    { school: "Punjab College", degree: "Intermediate, Pre-Engineering", year: "2020 - 2022" },
  ],
  experience: [
    { company: "Devsinc", role: "Frontend Developer Intern", duration: "Jun 2025 - Aug 2025" },
    { company: "Freelance", role: "UI/UX Designer", duration: "2024 - Present" },
  ],
};
const dummyUserProjects = [
  {
    title: "Portfolio Website Builder",
    category: "Design Tool",
    status: "Completed",
    description: "A drag-and-drop tool for freelancers to build portfolio websites.",
    skills: ["React", "Figma"],
    owner: "Ayesha Khan",
    teamCount: 3,
    maxTeamSize: 3,
  },
  {
    title: "Campus Event Finder",
    category: "Web App",
    status: "Active",
    description: "A platform for students to discover and RSVP to campus events.",
    skills: ["React", "Node.js"],
    owner: "Ayesha Khan",
    teamCount: 3,
    maxTeamSize: 4,
  },
];

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

        {/* Skills Section */}
        <div
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            padding: "24px",
            marginTop: "24px",
          }}
        >
          <h3 style={{ fontSize: "var(--font-size-h4)", fontWeight: "600", marginBottom: "16px" }}>
            Skills
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {dummyUser.skills.map((skill) => (
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
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            padding: "24px",
            marginTop: "24px",
          }}
        >
          <h3 style={{ fontSize: "var(--font-size-h4)", fontWeight: "600", marginBottom: "16px" }}>
            Education
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {dummyUser.education.map((edu, index) => (
              <div key={index}>
                <p style={{ fontSize: "var(--font-size-base)", fontWeight: "600" }}>
                  {edu.degree}
                </p>
                <p style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)" }}>
                  {edu.school} · {edu.year}
                </p>
              </div>
            ))}
         </div>
        </div>

        {/* Experience Section */}
        <div
          style={{
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            padding: "24px",
            marginTop: "24px",
          }}
        >
          <h3 style={{ fontSize: "var(--font-size-h4)", fontWeight: "600", marginBottom: "16px" }}>
            Experience
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {dummyUser.experience.map((exp, index) => (
              <div key={index}>
                <p style={{ fontSize: "var(--font-size-base)", fontWeight: "600" }}>
                  {exp.role}
                </p>
                <p style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)" }}>
                  {exp.company} · {exp.duration}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Project Portfolio Section */}
        <div style={{ marginTop: "24px" }}>
          <h3 style={{ fontSize: "var(--font-size-h4)", fontWeight: "600", marginBottom: "16px" }}>
            Project Portfolio
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
            }}
          >
            {dummyUserProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;