const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const { getMyProfile, updateMyProfile, uploadProfilePicture } = require("../controllers/userController");

router.get("/me", protect, getMyProfile);
router.put("/me", protect, updateMyProfile);
router.post("/me/picture", protect, upload.single("profilePicture"), uploadProfilePicture);

module.exports = router;