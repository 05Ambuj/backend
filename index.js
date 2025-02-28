// import express from 'express';
// import dotenv from 'dotenv';
// import cloudinary from 'cloudinary';
// import cookieParser from 'cookie-parser';
// import path from 'path'
// import { connectDB } from './database/dbconnection.js';
// import userRoutes from "./routes/userRoutes.js"
// import authRoutes from "./routes/authRoutes.js"
// import postRoutes from "./routes/postRoutes.js"
// import messageRoutes from "./routes/messageRoutes.js"
// import { app,server } from './socket/socket.js';


// app.use(express.json());
// app.use(cookieParser());

// dotenv.config();
// cloudinary.v2.config({

//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API,
//     api_secret: process.env.CLOUDINARY_SECRET,
// })

// const PORT = process.env.PORT;

// app.use("/api/user", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/post", postRoutes);
// app.use("/api/messages", messageRoutes);

// app.use(express.json());

// const __dirname=path.resolve()

// // app.use(express.static(path.join(__dirname,"../frontend/dist"))) 

// // app.get("*",(req,res)=>{
// //     res.sendFile(path.join(__dirname,"/frontend","/dist","index.html"))
// // })

// server.listen(PORT, () => {
//     console.log(`server is listening on  http://localhost:${PORT} `);
//     connectDB();
// }) 



import express from "express";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./database/dbconnection.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

// ✅ Define allowed frontend URLs
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  "https://frontend-okf7j3957-ambujs-projects-36059ff2.vercel.app",
];

// ✅ Enable CORS middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// ✅ API Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
  connectDB();
});
