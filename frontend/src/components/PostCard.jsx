import { useState } from "react";
function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  function handleCommentSubmit(e) {
    e.preventDefault();
    if (!commentText.trim()) return;
    post.onAddComment(post.id, commentText);
    setCommentText("");
  }
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
        <button
          style={{
            fontSize: "var(--font-size-small)",
            color: "var(--color-text-secondary)",
            fontWeight: "600",
          }}
          onClick={() => setShowComments(!showComments)}
        >
          💬 {post.commentsList.length}{" "}
          {post.commentsList.length === 1 ? "Comment" : "Comments"}
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--color-border)" }}>
          {/* Existing Comments */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "12px" }}>
            {post.commentsList.map((comment) => (
              <div key={comment.id} style={{ display: "flex", gap: "8px" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "var(--color-background-alt)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--font-size-caption)",
                    fontWeight: "700",
                    flexShrink: 0,
                  }}
                >
                  {comment.author.charAt(0)}
                </div>
                <div
                  style={{
                    background: "var(--color-background-alt)",
                    borderRadius: "var(--radius-sm)",
                    padding: "8px 12px",
                    flex: 1,
                  }}
                >
                  <p style={{ fontSize: "var(--font-size-caption)", fontWeight: "600" }}>
                    {comment.author}
                  </p>
                  <p style={{ fontSize: "var(--font-size-small)" }}>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              style={{
                flex: 1,
                padding: "8px 12px",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--font-size-small)",
              }}
            />
            <button
              type="submit"
              style={{
                background: "var(--color-primary)",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--font-size-small)",
                fontWeight: "600",
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PostCard;