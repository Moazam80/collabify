const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

// GET /api/projects/:id/messages — get chat history for a project
async function getMessages(req, res) {
  try {
    const conversation = await Conversation.findOne({ project: req.params.id });
    if (!conversation) {
      return res.status(200).json({ success: true, messages: [] });
    }

    const messages = await Message.find({ conversation: conversation._id })
      .sort({ createdAt: 1 })
      .populate("sender", "name");

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

module.exports = { getMessages };