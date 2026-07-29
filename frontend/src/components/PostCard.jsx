function PostCard({ post }) {
  return (
    <div
      style={{
        background: "var(--color-background)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        padding: "20px",
        marginBottom: "16px",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "var(--color-primary-light)",
            color: "var(--color-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
            fontSize: "var(--font-size-small)",
            flexShrink: 0,
          }}
        >
          {post.author.charAt(0)}
        </div>
        <div>
          <p style={{ fontSize: "var(--font-size-small)", fontWeight: "600" }}>{post.author}</p>
          <p style={{ fontSize: "var(--font-size-caption)", color: "var(--color-text-secondary)" }}>
            {post.timeAgo}
          </p>
        </div>
      </div>

      {/* Content */}
      <p style={{ fontSize: "var(--font-size-base)", marginBottom: "16px" }}>{post.content}</p>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          paddingTop: "12px",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <button
          style={{
            fontSize: "var(--font-size-small)",
            color: post.liked ? "var(--color-danger)" : "var(--color-text-secondary)",
            fontWeight: "600",
          }}
          onClick={() => post.onLike(post.id)}
        >
          {post.liked ? "❤️" : "🤍"} {post.likes} {post.likes === 1 ? "Like" : "Likes"}
        </button>
        <span style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)" }}>
          💬 {post.comments} {post.comments === 1 ? "Comment" : "Comments"}
        </span>
      </div>
    </div>
  );
}

export default PostCard;