const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  requestToJoin,
  getJoinRequests,
  acceptRequest,
  rejectRequest,
  getTeamMembers,
  removeMember,
} = require("../controllers/teamController");

router.post("/projects/:id/join-requests", protect, requestToJoin);
router.get("/projects/:id/join-requests", protect, getJoinRequests);
router.put("/join-requests/:id/accept", protect, acceptRequest);
router.put("/join-requests/:id/reject", protect, rejectRequest);
router.get("/projects/:id/team", getTeamMembers);
router.delete("/projects/:id/team/:userId", protect, removeMember);

module.exports = router;