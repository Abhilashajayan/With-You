import { MessageEntity } from "../../entity/messageEntity";
import { Request, Response } from "express";
import { messageUsecase } from "../../usecases/messageUsecase";

export class userController {
  private readonly messageUsecase: messageUsecase;
  constructor(messageUsecase: messageUsecase) {
    this.messageUsecase = messageUsecase;
  }

  async access_user(req: Request, res: Response) {
    try {
      const { userId, myid } = req.body;
      const chat = await this.messageUsecase.accessChat(userId, myid);
      res.status(200).json(chat);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async fetch_chat(req: Request, res: Response) {
    try {
      const userId: string = req.params.userId;
      const chat = await this.messageUsecase.fetchChat(userId);
      return res.status(200).json(chat);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async all_messages(req: Request, res: Response) {
    try {
      const userId: any = req.params.userId;
      console.log(userId);
      const allMsg = await this.messageUsecase.allMessages(userId);
      res.status(200).json(allMsg);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async send_message(req: Request, res: Response) {
    try {
      const { content, chatId, userId } = req.body;
      console.log(chatId);
      const chatData = await this.messageUsecase.sendMessage(
        chatId,
        content,
        userId
      );
      return res.status(200).json(chatData);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
