const express = require('express');
const cors = require('cors');
const { Server } = require("socket.io");

const io = new Server(4000, {
    cors:true,
})

const app = express();
app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("join-room", async (room) => {
        console.log(room);
        socket.join(room);
        io.to(room).emit("msg", `welcome to room no ${room}`);
    });
})


