import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controllers";
import { userRepository } from "../repositories/user.repo";
import userModel from "../../models/user.model";
import { UserUsecase } from "../../usecases/user.usercase";
import { rabbitmq } from "../../frameworks/messageBroker/rabbitmq";


export class UserRouter {
  router = Router();

  userRepository = new userRepository(userModel);
  userUsecase = new UserUsecase(this.userRepository);
  consumerMessage = new rabbitmq(this.userUsecase);
  userController = new UserController(this.userUsecase);
    
  constructor() {}

  async rabbitMq() {
    await this.consumerMessage.userLoginConsumer()
    await this.consumerMessage.userRegConsumer();
  }
}

export const userRouter = new UserRouter().router;