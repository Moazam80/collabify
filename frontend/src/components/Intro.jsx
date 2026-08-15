function Intro() {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "64px 24px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          fontSize: "var(--font-size-h2)",
          fontWeight: "700",
          marginBottom: "16px",
        }}
      >
        One Platform. Every Skill. Real Projects.
      </h2>

      <p
        style={{
          fontSize: "var(--font-size-base)",
          color: "var(--color-text-secondary)",
        }}
      >
        Got an idea but missing the right teammates? Or looking for a project
        that matches your skills? Collabify connects developers, designers,
        and creators so great ideas never stay stuck in someone's notes.
      </p>
    </section>
  );
}

export default Intro;