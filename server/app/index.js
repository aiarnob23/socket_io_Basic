const express = require('express');
const cors = require('cors');
const { Server } = require("socket.io");

const io = new Server(4000, {
    cors: {
        origin: "*",
        methods:["GET", "POST"]
    }
})


const app = express();
app.use(cors());
app.use(express.json());

//socket connection 
io.on("connection", (socket) => {
     
    //join room
    const socketId = socket.id;
    socket.on("join-room", async (room) => {
        socket.join(room);
        io.to(room).emit("joinRoomNavigate", { room, socketId });
        io.to(room).emit("joinedRoomsDetailsPass", { room, socketId });
    });

    //chat messages
    socket.on("chat-message", ({room, message}) => {
        socket.to(room).emit('receiveChatMessage', message);
     });

})


