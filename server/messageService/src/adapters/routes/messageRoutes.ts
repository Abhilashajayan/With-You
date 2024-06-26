import { Router, Request, Response } from "express";
import { userController } from "../controllers/messegeController";
import { messageUsecase } from "../../usecases/messageUsecase";
import { messageRepository } from "../../frameworks/repositories/messageRepo";
import userModel from "../../frameworks/models/userModel";
import chatModel from "../../frameworks/models/chatModel";
import messageModel from "../../frameworks/models/message.models";
import { rabbitmq } from "../../frameworks/messageBrokers/rabbitmq";

export class messageRoute {
  router = Router();
  messageRepo = new messageRepository(
    userModel,
    chatModel,
    messageModel
  );
   messageUsecases = new messageUsecase(this.messageRepo);
   consumerMessage = new rabbitmq(this.messageUsecases);
  messageController = new userController(this.messageUsecases);
  constructor() {
    

    this.router.post("/message/accessChat", (req: Request, res: Response) => {
      this.messageController.access_user(req, res);
    });

    this.router.get("/message/fetchChat/:userId", (req: Request, res: Response) => {
      this.messageController.fetch_chat(req, res);
    });

    this.router.get(
      "/message/getmessage/:userId",
      (req: Request, res: Response) => {
        this.messageController.all_messages(req, res);
      }
    );

    this.router.post("/message/send", (req: Request, res: Response) => {
      this.messageController.send_message(req, res);
    });
  }
  async rabbitMq() {
    await this.consumerMessage.messageConsumer();
    await this.consumerMessage.accessChatConsumer();
  }
}
export const messageRoutes = new messageRoute().router;
