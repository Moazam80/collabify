import { Link } from "react-router-dom";

function CallToAction() {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "80px 24px",
        background: "var(--color-primary)",
        color: "#fff",
      }}
    >
      <h2
        style={{
          fontSize: "var(--font-size-h2)",
          fontWeight: "700",
          marginBottom: "16px",
        }}
      >
        Ready to Bring Your Idea to Life?
      </h2>

      <p
        style={{
          fontSize: "var(--font-size-base)",
          marginBottom: "32px",
          opacity: "0.9",
        }}
      >
        Join Collabify today and connect with the teammates you need.
      </p>

      <Link
        to="/register"
        style={{
          background: "#fff",
          color: "var(--color-primary)",
          padding: "14px 32px",
          borderRadius: "8px",
          fontWeight: "700",
          fontSize: "var(--font-size-h4)",
          display: "inline-block",
        }}
      >
        Join Collabify — It's Free
      </Link>
    </section>
  );
}

export default CallToAction;