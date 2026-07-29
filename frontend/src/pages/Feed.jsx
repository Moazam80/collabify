import { useState } from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";

const initialPosts = [
  {
    id: 1,
    author: "Bilal R.",
    timeAgo: "2 hours ago",
    content: "Just shipped the first version of Campus Event Finder! Looking for a designer to help polish the UI. 🎉",
    likes: 12,
    liked: false,
    commentsList: [
      { id: 1, author: "Sara M.", text: "Congrats! This looks great." },
      { id: 2, author: "Zainab A.", text: "I'd love to help with the design!" },
    ],
  },
  {
    id: 2,
    author: "Sara M.",
    timeAgo: "5 hours ago",
    content: "Wrapped up the Freelance Portfolio Builder project this week. Huge thanks to everyone who joined the team!",
    likes: 24,
    liked: false,
    commentsList: [
      { id: 1, author: "Ayesha K.", text: "Amazing work team!" },
    ],
  },
  {
    id: 3,
    author: "Hamza T.",
    timeAgo: "1 day ago",
    content: "Looking for a React Native developer to join the Expense Tracker App. DM me if interested!",
    likes: 8,
    liked: false,
    commentsList: [],
  },
];

function Feed() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState("");

  function handleLike(id) {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  }

  function handlePostSubmit(e) {
    e.preventDefault();
    if (!newPost.trim()) return;

    const newPostObject = {
      id: Date.now(),
      author: "You",
      timeAgo: "Just now",
      content: newPost,
      likes: 0,
      liked: false,
      commentsList: [],
    };

    setPosts([newPostObject, ...posts]);
    setNewPost("");
  }

  function handleAddComment(postId, commentText) {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              commentsList: [
                ...post.commentsList,
                { id: Date.now(), author: "You", text: commentText },
              ],
            }
          : post
      )
    );
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "40px 24px" }}>
        <h1 style={{ fontSize: "var(--font-size-h2)", fontWeight: "700", marginBottom: "24px" }}>
          Feed
        </h1>

        {/* Create Post Box */}
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
            style={{
              background: "var(--color-primary)",
              color: "#fff",
              padding: "10px 24px",
              borderRadius: "var(--radius-sm)",
              fontWeight: "600",
              fontSize: "var(--font-size-small)",
            }}
          >
            Post
          </button>
        </form>

        {/* Posts List */}
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={{ ...post, onLike: handleLike, onAddComment: handleAddComment }}
          />
        ))}
      </div>
    </div>
  );
}

export default Feed;