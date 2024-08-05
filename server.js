const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server,{
    cors: {
        origin: '*',
    }
});

let rooms = [];

io.on('connection', (socket) => {
    console.log('A user connected with socket id: ', socket.id);
    socket.on('createRoom', (room) => {
        rooms.push(room);
        socket.join(room);
        console.log('A user created room: ' + room);
    });
    socket.on('joinRoom', (room,id) => {
        if(rooms.includes(room)){
            socket.join(room);
            console.log('A user joined room: ' + room);
            io.to(room).emit('userJoined',id);
        }
        socket.join(room);
        console.log('A user joined room: ' + room);
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const port = 3001;
server.listen(port, () => {
    console.log(`Socket.IO server is running on port ${port}`);
});