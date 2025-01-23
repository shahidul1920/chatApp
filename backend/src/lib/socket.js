import {Server} from "socket.io";
import http from "http";
import express from "express";
import { Socket } from "dgram";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    },
});

export function getReceiverSocketId(userId){
    console.log(userId, "h");
    
    return userSocketMap[userId]
}

const userSocketMap = {};


io.on("connection", (socket) =>{
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId; 
    if(userId) userSocketMap[userId] = socket.id;

    //useed to send events to all connected user
    io.emit("getOnlineUser", Object.keys(userSocketMap));

    socket.on("disconnect", ()=>{
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUser", Object.keys(userSocketMap));
    })
    
})

export {io, app, server}