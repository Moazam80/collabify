function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Create Your Profile",
      description:
        "Add your skills, education, experience, and portfolio links so others know what you bring to the table.",
    },
    {
      number: "2",
      title: "Find or Post a Project",
      description:
        "Browse projects that match your skills, or post your own idea and list the teammates you need.",
    },
    {
      number: "3",
      title: "Build & Showcase",
      description:
        "Collaborate with your team, complete the project, and showcase it on your Collabify profile.",
    },
  ];

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
        How Collabify Works
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "32px",
          flexWrap: "wrap",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {steps.map((step) => (
          <div
            key={step.number}
            style={{
              background: "var(--color-background)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              padding: "32px",
              maxWidth: "280px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "var(--color-primary-light)",
                color: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "var(--font-size-h4)",
                margin: "0 auto 16px auto",
              }}
            >
              {step.number}
            </div>
            <h3
              style={{
                fontSize: "var(--font-size-h4)",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontSize: "var(--font-size-small)",
                color: "var(--color-text-secondary)",
              }}
            >
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;