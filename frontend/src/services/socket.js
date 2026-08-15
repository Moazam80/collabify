import { io } from "socket.io-client";

let socket = null;

export function connectSocket(userName) {
  const token = localStorage.getItem("collabify_token");
  if (!token) return null;

 const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  socket = io(API_URL, {
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