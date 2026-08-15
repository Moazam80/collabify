const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Message = require("./models/Message");
const Conversation = require("./models/Conversation");

function setupSocket(httpServer) {
 const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "https://collabify-t2a6.vercel.app"],
      credentials: true,
    },
  });

  // Tracks which users are online in which project rooms
  // Structure: { projectId: Set of { userId, userName } }
  const onlineUsers = {};

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Not authorized"));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      socket.userName = socket.handshake.auth.userName || "Unknown";
      next();
    } catch (error) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.userId);

    socket.on("join_room", (projectId) => {
      socket.join(projectId);
      socket.currentRoom = projectId;

      if (!onlineUsers[projectId]) {
        onlineUsers[projectId] = new Map();
      }
      onlineUsers[projectId].set(socket.userId, socket.userName);

      const onlineList = Array.from(onlineUsers[projectId].values());
      io.to(projectId).emit("online_users", onlineList);
    });

    socket.on("send_message", async ({ projectId, text }) => {
      try {
        let conversation = await Conversation.findOne({ project: projectId });
        if (!conversation) {
          conversation = await Conversation.create({ project: projectId });
        }

        const message = await Message.create({
          conversation: conversation._id,
          sender: socket.userId,
          text,
        });

        const populatedMessage = await message.populate("sender", "name");

        io.to(projectId).emit("receive_message", populatedMessage);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.userId);

      const projectId = socket.currentRoom;
      if (projectId && onlineUsers[projectId]) {
        onlineUsers[projectId].delete(socket.userId);
        const onlineList = Array.from(onlineUsers[projectId].values());
        io.to(projectId).emit("online_users", onlineList);
      }
    });
  });

  return io;
}

module.exports = setupSocket;