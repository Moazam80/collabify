const Post = require("../models/Post");
const Comment = require("../models/Comment");

// GET /api/posts — get all posts (public), newest first
async function getAllPosts(req, res) {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "name profilePicture");

    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const comments = await Comment.find({ post: post._id })
          .sort({ createdAt: 1 })
          .populate("author", "name profilePicture");
        return { ...post.toObject(), commentsList: comments };
      })
    );

    res.status(200).json({ success: true, posts: postsWithComments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

// POST /api/posts — create a post (protected)
async function createPost(req, res) {
  try {
    const { content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: "Post content cannot be empty." });
    }

    const post = await Post.create({ author: req.userId, content });
    const populatedPost = await post.populate("author", "name profilePicture");
    res.status(201).json({ success: true, post: { ...populatedPost.toObject(), commentsList: [] } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

// DELETE /api/posts/:id — delete own post (protected)
async function deletePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found." });
    }
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Not authorized." });
    }
    await post.deleteOne();
    await Comment.deleteMany({ post: post._id });
    res.status(200).json({ success: true, message: "Post deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

// POST /api/posts/:id/like — toggle like (protected)
async function toggleLike(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found." });
    }

    const alreadyLiked = post.likes.some((id) => id.toString() === req.userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== req.userId);
    } else {
      post.likes.push(req.userId);
    }

    await post.save();
    res.status(200).json({ success: true, likes: post.likes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

// POST /api/posts/:id/comments — add a comment (protected)
async function addComment(req, res) {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: "Comment cannot be empty." });
    }

    const comment = await Comment.create({
      post: req.params.id,
      author: req.userId,
      text,
    });
   const populatedComment = await comment.populate("author", "name profilePicture");
    res.status(201).json({ success: true, comment: populatedComment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

module.exports = { getAllPosts, createPost, deletePost, toggleLike, addComment };