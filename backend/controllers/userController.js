const User = require("../models/User");

async function getMyProfile(req, res) {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

async function updateMyProfile(req, res) {
  try {
    const { name, bio, skills, githubUrl, linkedinUrl } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { name, bio, skills, githubUrl, linkedinUrl },
      { new: true }
    ).select("-password");

    res.status(200).json({ success: true, message: "Profile updated.", user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

module.exports = { getMyProfile, updateMyProfile };