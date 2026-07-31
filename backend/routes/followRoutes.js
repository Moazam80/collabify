const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { followUser, unfollowUser, getFollowStatus } = require("../controllers/followController");

router.post("/:id/follow", protect, followUser);
router.delete("/:id/follow", protect, unfollowUser);
router.get("/:id/follow-status", getFollowStatus);

module.exports = router;