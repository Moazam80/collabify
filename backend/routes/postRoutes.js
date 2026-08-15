const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getAllPosts,
  createPost,
  deletePost,
  toggleLike,
  addComment,
} = require("../controllers/postController");

router.get("/", getAllPosts);
router.post("/", protect, createPost);
router.delete("/:id", protect, deletePost);
router.post("/:id/like", protect, toggleLike);
router.post("/:id/comments", protect, addComment);

module.exports = router;