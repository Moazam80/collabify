const Notification = require("../models/Notification");

// GET /api/notifications — get current user's notifications
async function getMyNotifications(req, res) {
  try {
    const notifications = await Notification.find({ recipient: req.userId })
      .sort({ createdAt: -1 })
      .populate("sender", "name")
      .populate("project", "title")
      .populate("post", "content");

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

// PUT /api/notifications/:id/read — mark one notification as read
async function markAsRead(req, res) {
  try {
    await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: req.userId },
      { isRead: true }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

// PUT /api/notifications/read-all — mark all as read
async function markAllAsRead(req, res) {
  try {
    await Notification.updateMany({ recipient: req.userId, isRead: false }, { isRead: true });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

module.exports = { getMyNotifications, markAsRead, markAllAsRead };