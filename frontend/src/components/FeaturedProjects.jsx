import ProjectCard from "./ProjectCard";

const dummyProjects = [
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
    title: "Campus Event Finder",
    category: "Web App",
    status: "Active",
    description: "A platform for students to discover and RSVP to campus events.",
    skills: ["React", "Node.js"],
    owner: "Bilal R.",
    teamCount: 3,
    maxTeamSize: 4,
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
  },
];

function FeaturedProjects() {
  return (
    <section
      style={{
        padding: "64px 24px",
        background: "var(--color-background-alt)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "var(--font-size-h2)",
          fontWeight: "700",
          marginBottom: "48px",
        }}
      >
        Featured Projects
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {dummyProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProjects;