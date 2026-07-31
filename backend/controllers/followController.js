const Follow = require("../models/Follow");
const User = require("../models/User");

// POST /api/users/:id/follow — follow a user
async function followUser(req, res) {
  try {
    const targetUserId = req.params.id;

    if (targetUserId === req.userId) {
      return res.status(400).json({ success: false, message: "You cannot follow yourself." });
    }

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const existingFollow = await Follow.findOne({ follower: req.userId, following: targetUserId });
    if (existingFollow) {
      return res.status(400).json({ success: false, message: "You are already following this user." });
    }

    await Follow.create({ follower: req.userId, following: targetUserId });

    res.status(201).json({ success: true, message: "Followed successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

// DELETE /api/users/:id/follow — unfollow a user
async function unfollowUser(req, res) {
  try {
    await Follow.findOneAndDelete({ follower: req.userId, following: req.params.id });
    res.status(200).json({ success: true, message: "Unfollowed successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

// GET /api/users/:id/follow-status — check if current user follows this user + get counts
async function getFollowStatus(req, res) {
  try {
    const targetUserId = req.params.id;

    const followerCount = await Follow.countDocuments({ following: targetUserId });
    const followingCount = await Follow.countDocuments({ follower: targetUserId });

    let isFollowing = false;
    if (req.userId) {
      const existingFollow = await Follow.findOne({ follower: req.userId, following: targetUserId });
      isFollowing = !!existingFollow;
    }

    res.status(200).json({ success: true, followerCount, followingCount, isFollowing });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

module.exports = { followUser, unfollowUser, getFollowStatus };