import express from 'express';
//const cors = require('cors')
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import messageRoutes from './routes/messageRoutes.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use(cors())
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});