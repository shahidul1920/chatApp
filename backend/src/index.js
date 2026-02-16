import express from 'express';
//const cors = require('cors')
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import messageRoutes from './routes/messageRoutes.route.js';
import authRoutes from './routes/auth.route.js';
import { app, server  } from './lib/socket.js';


app.use(cors({
    origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

dotenv.config();
const PORT = process.env.PORT || 5001;
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);




server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

