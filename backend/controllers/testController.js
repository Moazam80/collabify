function getTestMessage(req, res) {
  res.json({
    success: true,
    message: "Collabify backend is connected and working!",
  });
}

module.exports = { getTestMessage };