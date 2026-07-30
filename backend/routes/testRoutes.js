const express = require("express");
const router = express.Router();
const { getTestMessage } = require("../controllers/testController");

router.get("/", getTestMessage);

module.exports = router;