import express from "express";
import cors from "cors";
import nocache from "nocache";
import { dbConnection } from "./database/database.conn";
import { messageRoutes , messageRoute } from "../adapters/routes/messageRoutes";
const messageRout = new messageRoute;
import {Server, Socket} from 'socket.io' 


const app = express();
const port = process.env.PORT || 3005;
messageRout.rabbitMq();
app.use(cors());

app.use(nocache());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnection();
app.use(messageRoutes);
const server = app.listen(port, () => {
  console.log(`Server Running on ${port}`);
  
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket: any) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData: any) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room: any) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room : any) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room : any) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved: any) => {
    var chat = newMessageRecieved.chat;
    console.log("Chat Message: " + chat.users);
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user: any) => {
      if (user !== newMessageRecieved.sender) {;
       console.log(user ,"cb: " + newMessageRecieved.sender)
        socket.in(user).emit("message recieved", newMessageRecieved);
      }
    });
  });
  socket.off("setup", (userData : any)=>{
    console.log("User Disconnected");
    socket.leave(userData._id)
})
});

