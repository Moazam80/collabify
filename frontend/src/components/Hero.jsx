import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "80px 24px",
        background: "var(--color-primary-light)",
      }}
    >
      <h1
        style={{
          fontSize: "var(--font-size-h1)",
          fontWeight: "700",
          color: "var(--color-text-primary)",
          marginBottom: "16px",
        }}
      >
        Where Skills Meet Ideas.
      </h1>

      <p
        style={{
          fontSize: "var(--font-size-base)",
          color: "var(--color-text-secondary)",
          maxWidth: "600px",
          margin: "0 auto 32px auto",
        }}
      >
        Collabify helps students, developers, designers, and creators find
        project ideas, build teams, and bring ideas to life — together.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
        <Link
          to="/register"
          style={{
            background: "var(--color-primary)",
            color: "#fff",
            padding: "14px 28px",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "var(--font-size-h4)",
          }}
        >
          Get Started
        </Link>

        <Link
          to="/projects"
          style={{
            background: "transparent",
            color: "var(--color-primary)",
            border: "1px solid var(--color-primary)",
            padding: "14px 28px",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "var(--font-size-h4)",
          }}
        >
          Browse Projects
        </Link>
      </div>
    </section>
  );
}

export default Hero;