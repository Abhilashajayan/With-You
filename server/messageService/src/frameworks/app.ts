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
app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
