function Features() {
  const features = [
    {
      icon: "🎯",
      title: "Skill-Based Discovery",
      description: "Find projects that match exactly what you're good at.",
    },
    {
      icon: "🤝",
      title: "Team Building",
      description: "Send and manage join requests to build the perfect team.",
    },
    {
      icon: "📁",
      title: "Project Portfolio",
      description: "Showcase your completed work right on your profile.",
    },
    {
      icon: "💬",
      title: "Social Collaboration",
      description: "Post updates, follow others, and stay connected with your network.",
    },
  ];

  return (
    <section style={{ padding: "64px 24px" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "var(--font-size-h2)",
          fontWeight: "700",
          marginBottom: "48px",
        }}
      >
        Everything You Need to Collaborate
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>
              {feature.icon}
            </div>
            <h3
              style={{
                fontSize: "var(--font-size-h4)",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              {feature.title}
            </h3>
            <p
              style={{
                fontSize: "var(--font-size-small)",
                color: "var(--color-text-secondary)",
              }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;