const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Message = require("./models/Message");
const Conversation = require("./models/Conversation");

function setupSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Not authorized"));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (error) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.userId);

    socket.on("join_room", (projectId) => {
      socket.join(projectId);
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
    });
  });

  return io;
}

module.exports = setupSocket;