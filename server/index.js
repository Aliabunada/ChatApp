const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    console.log(`User connect with Id ${socket.id} with room ${data}`);

    socket.join(data);
    // console.log(data, "");
  });

  socket.on("sendMessage", (data) => {
    console.log(data, "Msg");
    socket.to(data.room).emit("recive_message", data);
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
app.get("/hi", (req, res) => {
  res.send("hello");
});

server.listen(3001, () => {
  console.log("server is running ");
});
