import { useState } from "react";
import { getImageUrl } from "../utils/getImageUrl";

function timeAgo(dateString) {
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  function handleCommentSubmit(e) {
    e.preventDefault();
    if (!commentText.trim()) return;
    post.onAddComment(post._id, commentText);
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
            overflow: "hidden",
          }}
        >
          {post.authorPicture ? (
            <img src={getImageUrl(post.authorPicture)} alt={post.author} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            post.author.charAt(0)
          )}
        </div>
        <div>
          <p style={{ fontSize: "var(--font-size-small)", fontWeight: "600" }}>{post.author}</p>
          <p style={{ fontSize: "var(--font-size-caption)", color: "var(--color-text-secondary)" }}>
            {timeAgo(post.createdAt)}
          </p>
        </div>
      </div>

      <p style={{ fontSize: "var(--font-size-base)", marginBottom: "16px" }}>{post.content}</p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
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
          onClick={() => post.onLike(post._id)}
        >
          {post.liked ? "❤️" : "🤍"} {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </button>

        <button
          style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", fontWeight: "600" }}
          onClick={() => setShowComments(!showComments)}
        >
          💬 {post.commentsList.length} {post.commentsList.length === 1 ? "Comment" : "Comments"}
        </button>

        <button
          style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", fontWeight: "600" }}
          onClick={() => {
            navigator.clipboard.writeText(`Check out this post by ${post.author} on Collabify!`);
            alert("Post link copied to clipboard!");
          }}
        >
          🔗 Share
        </button>
      </div>

      {showComments && (
        <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--color-border)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "12px" }}>
            {post.commentsList.map((comment) => (
              <div key={comment._id} style={{ display: "flex", gap: "8px" }}>
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
                    overflow: "hidden",
                  }}
                >
                  {comment.author.profilePicture ? (
                    <img
                      src={getImageUrl(comment.author.profilePicture)}
                      alt={comment.author.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    comment.author.name.charAt(0)
                  )}
                </div>
                <div style={{ background: "var(--color-background-alt)", borderRadius: "var(--radius-sm)", padding: "8px 12px", flex: 1 }}>
                  <p style={{ fontSize: "var(--font-size-caption)", fontWeight: "600" }}>{comment.author.name}</p>
                  <p style={{ fontSize: "var(--font-size-small)" }}>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleCommentSubmit} style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              style={{ flex: 1, padding: "8px 12px", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", fontSize: "var(--font-size-small)" }}
            />
            <button
              type="submit"
              style={{ background: "var(--color-primary)", color: "#fff", padding: "8px 16px", borderRadius: "var(--radius-sm)", fontSize: "var(--font-size-small)", fontWeight: "600" }}
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