require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const setupSocket = require("./socket");
const testRoutes = require("./routes/testRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use(limiter);

app.get("/", (req, res) => {
  res.send("Collabify API is running 🚀");
});

app.use("/api/test", testRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const projectRoutes = require("./routes/projectRoutes");
app.use("/api/projects", projectRoutes);

const teamRoutes = require("./routes/teamRoutes");
app.use("/api", teamRoutes);

const postRoutes = require("./routes/postRoutes");
app.use("/api/posts", postRoutes);

const followRoutes = require("./routes/followRoutes");
app.use("/api/users", followRoutes);

const messageRoutes = require("./routes/messageRoutes");
app.use("/api", messageRoutes);

const notificationRoutes = require("./routes/notificationRoutes");
app.use("/api/notifications", notificationRoutes);

const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

const httpServer = http.createServer(app);
setupSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});