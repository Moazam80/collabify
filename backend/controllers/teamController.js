const Project = require("../models/Project");
const TeamMember = require("../models/TeamMember");
const JoinRequest = require("../models/JoinRequest");

// POST /api/projects/:id/join-requests — request to join a project
async function requestToJoin(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    if (project.owner.toString() === req.userId) {
      return res.status(400).json({ success: false, message: "You cannot join your own project." });
    }

    const existingMember = await TeamMember.findOne({ project: project._id, user: req.userId });
    if (existingMember) {
      return res.status(400).json({ success: false, message: "You are already a member of this project." });
    }

    const existingRequest = await JoinRequest.findOne({
      project: project._id,
      user: req.userId,
      status: "pending",
    });
    if (existingRequest) {
      return res.status(400).json({ success: false, message: "You already have a pending request for this project." });
    }

    const request = await JoinRequest.create({
      project: project._id,
      user: req.userId,
      message: req.body.message || "",
    });

    res.status(201).json({ success: true, message: "Join request sent.", request });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

// GET /api/projects/:id/join-requests — view pending requests (owner only)
async function getJoinRequests(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Not authorized." });
    }

    const requests = await JoinRequest.find({ project: project._id, status: "pending" }).populate(
      "user",
      "name email"
    );

    res.status(200).json({ success: true, requests });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

// PUT /api/join-requests/:id/accept
async function acceptRequest(req, res) {
  try {
    const request = await JoinRequest.findById(req.params.id).populate("project");
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found." });
    }

    if (request.project.owner.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Not authorized." });
    }

    await TeamMember.create({
      project: request.project._id,
      user: request.user,
      role: "Team Member",
    });

    request.status = "accepted";
    await request.save();

    res.status(200).json({ success: true, message: "Request accepted." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

// PUT /api/join-requests/:id/reject
async function rejectRequest(req, res) {
  try {
    const request = await JoinRequest.findById(req.params.id).populate("project");
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found." });
    }

    if (request.project.owner.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Not authorized." });
    }

    request.status = "rejected";
    await request.save();

    res.status(200).json({ success: true, message: "Request rejected." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

// GET /api/projects/:id/team — view team members (public)
async function getTeamMembers(req, res) {
  try {
    const members = await TeamMember.find({ project: req.params.id }).populate("user", "name email");
    res.status(200).json({ success: true, members });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

// DELETE /api/projects/:id/team/:userId — remove team member (owner only)
async function removeMember(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    if (project.owner.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Not authorized." });
    }

    await TeamMember.findOneAndDelete({ project: req.params.id, user: req.params.userId });

    res.status(200).json({ success: true, message: "Member removed." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
}

module.exports = {
  requestToJoin,
  getJoinRequests,
  acceptRequest,
  rejectRequest,
  getTeamMembers,
  removeMember,
};