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
// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: process.env.FRONTEND_URL || "*",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // Store user socket mappings
// const userSocketMap = {};

// // ✅ Export this function properly
// export const getReciverSocketId = (receiverId) => {
//   return userSocketMap[receiverId];
// };

// io.on("connection", (socket) => {
//   console.log(`✅ User Connected: ${socket.id}`);

//   const userId = socket.handshake.query.userId;
//   if (userId && userId !== "undefined") {
//     userSocketMap[userId] = socket.id;
//   }

//   io.emit("getOnlineUser", Object.keys(userSocketMap));

//   socket.on("disconnect", () => {
//     console.log(`❌ User Disconnected: ${socket.id}`);
//     delete userSocketMap[userId];
//     io.emit("getOnlineUser", Object.keys(userSocketMap));
//   });
// });

// // ✅ Ensure all exports are correct
// export { io, server, app };

import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ Define allowed frontend URLs
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "https://frontend-okf7j3957-ambujs-projects-36059ff2.vercel.app",
];

// ✅ Enable CORS middleware for API requests
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ Fix CORS for WebSocket (Socket.io)
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Store user socket mappings
const userSocketMap = {};

export const getReciverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log(`✅ User Connected: ${socket.id}`);

  const userId = socket.handshake.query.userId;
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUser", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(`❌ User Disconnected: ${socket.id}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUser", Object.keys(userSocketMap));
  });
});

export { io, server, app };
