import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    myProjects: 0,
    joinedProjects: 0,
    pendingRequests: 0,
    followers: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const projectsRes = await api.get("/projects");
        const allProjects = projectsRes.data.projects;
        const myProjects = allProjects.filter((p) => p.owner._id === user.id);

        const followRes = await api.get(`/users/${user.id}/follow-status`);

        let pendingCount = 0;
        for (const project of myProjects) {
          const reqRes = await api.get(`/projects/${project._id}/join-requests`);
          pendingCount += reqRes.data.requests.length;
        }

        let joinedCount = 0;
        for (const project of allProjects) {
          if (project.owner._id !== user.id) {
            const teamRes = await api.get(`/projects/${project._id}/team`);
            if (teamRes.data.members.some((m) => m.user._id === user.id)) {
              joinedCount++;
            }
          }
        }

        setStats({
          myProjects: myProjects.length,
          joinedProjects: joinedCount,
          pendingRequests: pendingCount,
          followers: followRes.data.followerCount,
        });
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      }
    }
    loadStats();
  }, [user]);

  const statCards = [
    { label: "My Projects", value: stats.myProjects, icon: "📁", color: "var(--color-primary)" },
    { label: "Joined Projects", value: stats.joinedProjects, icon: "🤝", color: "var(--color-secondary)" },
    { label: "Pending Requests", value: stats.pendingRequests, icon: "📨", color: "var(--color-warning)" },
    { label: "Followers", value: stats.followers, icon: "👥", color: "var(--color-success)" },
  ];

  return (
    <div>
      <h1 style={{ fontSize: "var(--font-size-h2)", fontWeight: "700", marginBottom: "8px" }}>
        Welcome back, {user?.name} 👋
      </h1>
      <p style={{ fontSize: "var(--font-size-base)", color: "var(--color-text-secondary)", marginBottom: "32px" }}>
        Here's what's happening with your projects.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        {statCards.map((stat) => (
          <div
            key={stat.label}
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "var(--radius-sm)",
                background: "var(--color-background-alt)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                flexShrink: 0,
              }}
            >
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: "var(--font-size-h3)", fontWeight: "700", color: stat.color }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)" }}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;