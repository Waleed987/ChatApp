const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
  cors:{
    origin: "http://localhost:5173",
    methods: ["GET","POST"],
  },
});


io.on("connection",(socket)=>{
  socket.on("join room", (data)=>{
    socket.join(data);
    console.log(`User with id ${socket.id} joined Room : ${data}`);
  })
  socket.on("send message",(data)=>{
    socket.to(data.room).emit("rec_message",data);
  })


});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('listening on *:5173');
});