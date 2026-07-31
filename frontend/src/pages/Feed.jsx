import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await api.get("/posts");
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLike(postId) {
    try {
      await api.post(`/posts/${postId}/like`);
      fetchPosts();
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  }

  async function handleAddComment(postId, commentText) {
    try {
      await api.post(`/posts/${postId}/comments`, { text: commentText });
      fetchPosts();
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  }

  async function handlePostSubmit(e) {
    e.preventDefault();
    if (!newPost.trim()) return;

    setPosting(true);
    try {
      await api.post("/posts", { content: newPost });
      setNewPost("");
      fetchPosts();
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setPosting(false);
    }
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "40px 24px" }}>
        <h1 style={{ fontSize: "var(--font-size-h2)", fontWeight: "700", marginBottom: "24px" }}>
          Feed
        </h1>

        {user && (
          <form
            onSubmit={handlePostSubmit}
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              padding: "16px",
              marginBottom: "24px",
            }}
          >
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share an update with the community..."
              rows={3}
              style={{
                width: "100%",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                padding: "12px",
                fontSize: "var(--font-size-base)",
                fontFamily: "inherit",
                resize: "vertical",
                marginBottom: "12px",
              }}
            />
            <button
              type="submit"
              disabled={posting}
              style={{
                background: "var(--color-primary)",
                color: "#fff",
                padding: "10px 24px",
                borderRadius: "var(--radius-sm)",
                fontWeight: "600",
                fontSize: "var(--font-size-small)",
                opacity: posting ? 0.6 : 1,
              }}
            >
              {posting ? "Posting..." : "Post"}
            </button>
          </form>
        )}

        {loading ? (
          <p style={{ textAlign: "center", color: "var(--color-text-secondary)" }}>Loading feed...</p>
        ) : posts.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--color-text-secondary)" }}>
            No posts yet. Be the first to share an update!
          </p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={{
                ...post,
                author: post.author.name,
                liked: user ? post.likes.includes(user.id) : false,
                onLike: handleLike,
                onAddComment: handleAddComment,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Feed;