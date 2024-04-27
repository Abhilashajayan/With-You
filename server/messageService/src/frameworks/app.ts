import express from "express";
import cors from "cors";
import nocache from "nocache";
import { dbConnection } from "./database/database.conn";
import { messageRoutes , messageRoute } from "../adapters/routes/messageRoutes";
const messageRout = new messageRoute;



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

  socket.on("typing", (room: any) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room: any) => socket.in(room).emit("stop typing"));

  socket.on("call", (data: any) => {
    console.log("Call received:", data);
    io.to(data.recipientId).emit("call received", data.callerId, data.username);
  });

  socket.on("accept call", (data: any) => {
    const { callerId, recipientId } = data;
    console.log("Call accepted by:", callerId);
    io.to(recipientId).emit("call accepted", data.callerId);
    const room = `${callerId}-${recipientId}`;
    socket.join(room);
  });

  socket.on("reject call", (data: any) => {
    const { callerId,recipientId } = data;
    console.log("Call rejected by:", callerId);
    io.to(recipientId).emit("rejected call");
  });

  socket.on("cancel call", (data: any) => {
    const { callerId, recipientId } = data;
    console.log("Call cancelled by:", callerId);
    io.to(recipientId).emit("call cancelled");
  });

  socket.on("signal", (signalPayload: any) => {
    console.log("Received signal:", signalPayload);
    try {
      const { userId, signalData  } = signalPayload;
      if (userId && signalData) {
        io.to(userId).emit("signal", signalData);
      } else {
        console.error("Invalid signal payload received:", signalPayload);
      }
    } catch (error) {
      console.error("Error handling signal:", error);
    }
  });
  

  socket.on("new message", (newMessageReceived: any) => {
    var chat = newMessageReceived.chat;
    console.log("Chat Message: " + chat.users);
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user: any) => {
      if (user !== newMessageReceived.sender) {
        console.log(user, "cb: " + newMessageReceived.sender);
        socket.in(user).emit("message recieved", newMessageReceived);
      }
    });
  });

  socket.off("setup", (userData: any) => {
    console.log("User Disconnected");
    socket.leave(userData._id);
  });
});


