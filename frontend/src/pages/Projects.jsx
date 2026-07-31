import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import api from "../services/api";

function Projects() {
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Web App", "Mobile App", "AI/ML", "Design Tool"];

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await api.get("/projects");
        setAllProjects(response.data.projects);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

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
        <p style={{ fontSize: "var(--font-size-base)", color: "var(--color-text-secondary)", marginBottom: "24px" }}>
          Find a project that matches your skills and start collaborating.
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "32px" }}>
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
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", color: "var(--color-text-secondary)" }}>Loading projects...</p>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
              {filteredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <p style={{ textAlign: "center", color: "var(--color-text-secondary)", padding: "48px 0" }}>
                No projects match your search. Try a different keyword.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Projects;