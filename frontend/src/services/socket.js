import { io } from "socket.io-client";

let socket = null;

export function connectSocket(userName) {
  const token = localStorage.getItem("collabify_token");
  if (!token) return null;

  socket = io("http://localhost:5000", {
    auth: { token, userName },
  });

  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}