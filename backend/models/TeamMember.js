const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      default: "Team Member",
    },
  },
  { timestamps: true }
);

// Prevents the same user from being added twice to the same project's team
teamMemberSchema.index({ project: 1, user: 1 }, { unique: true });

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

module.exports = TeamMember;