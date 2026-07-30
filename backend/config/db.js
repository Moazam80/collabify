const mongoose = require("mongoose");
const dns = require("dns");

// Force Node.js to use Google's DNS servers to resolve MongoDB Atlas addresses
// This works around Windows network/DNS issues without changing system settings
dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    console.error("MongoDB connection failed ❌", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;