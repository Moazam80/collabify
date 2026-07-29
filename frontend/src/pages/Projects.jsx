import { useState } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

// Dummy data for now — will come from API in Phase 14
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
  {
    title: "Expense Tracker App",
    category: "Mobile App",
    status: "Active",
    description: "A simple mobile app to track daily expenses and set budgets.",
    skills: ["React Native", "Node.js"],
    owner: "Hamza T.",
    teamCount: 2,
    maxTeamSize: 4,
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
  },
];

function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Web App", "Mobile App", "AI/ML", "Design Tool"];

  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = category === "All" || project.category === category;

    return matchesSearch && matchesCategory;
  });
  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
        <h1 style={{ fontSize: "var(--font-size-h2)", fontWeight: "700", marginBottom: "8px" }}>
          Browse Projects
        </h1>
        <p
          style={{
            fontSize: "var(--font-size-base)",
            color: "var(--color-text-secondary)",
            marginBottom: "24px",
          }}
        >
          Find a project that matches your skills and start collaborating.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "32px",
          }}
        >
          <input
            type="text"
            placeholder="Search projects by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              minWidth: "220px",
              height: "44px",
              padding: "12px 16px",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              fontSize: "var(--font-size-base)",
            }}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              height: "44px",
              padding: "0 16px",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              fontSize: "var(--font-size-base)",
              background: "var(--color-background)",
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
         {filteredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "var(--color-text-secondary)",
              padding: "48px 0",
            }}
          >
            No projects match your search. Try a different keyword.
          </p>
        )}
      </div>
    </div>
  );
}

export default Projects;