// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// export const getReciverSocketId = (reciverId) => {
//   return userSocketMap[reciverId];
// };

// const userSocketMap = {};

// io.on("connection", (socket) => {
//   console.log("User Connected", socket.id);

//   const userId = socket.handshake.query.userId;

//   if (userId != "undefined") userSocketMap[userId] = socket.id;

//   io.emit("getOnlineUser", Object.keys(userSocketMap)); //[1,2,3,4]

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//     delete userSocketMap[userId];
//     io.emit("getOnlineUser", Object.keys(userSocketMap));
//   });
// });

// export { io, server, app };

import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// Use dynamic port from Render
const PORT = process.env.PORT || 5000;

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "*", // Replace with your frontend URL in Render
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {};

// Function to get receiver's socket ID
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log(`✅ User Connected: ${socket.id}`);

  const userId = socket.handshake.query.userId;

  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUser", Object.keys(userSocketMap));

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`❌ User Disconnected: ${socket.id}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUser", Object.keys(userSocketMap));
  });
});

export { io, server, app };
