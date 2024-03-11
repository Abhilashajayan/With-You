import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controllers";
import { userRepository } from "../repositories/user.repo";
import userModel from "../../models/user.model";
import { UserUsecase } from "../../usecases/user.usercase";
import { rabbitmq } from "../../frameworks/messageBroker/rabbitmq";
import multerConfig from '../../frameworks/services/multer'

export class UserRouter {
  router = Router();

  userRepository = new userRepository(userModel);
  userUsecase = new UserUsecase(this.userRepository);
  consumerMessage = new rabbitmq(this.userUsecase);
  userController = new UserController(this.userUsecase);

  constructor() {
    this.router.get("/users/getAllUsers", (req: Request, res: Response) => {
      this.userController.getAllUsers(req, res);
    });

    this.router.get("/match/getRandomUser", (req: Request, res: Response) => {
      this.userController.getRandomUser(req, res);
    });

    this.router.post(
      "/users/editUser/:userId",
      multerConfig.single('uploadPic'),
      (req: Request, res: Response) => {
        this.userController.editUser(req, res);
        console.log(req.files,"hhh");
      }
    );
  }

  async rabbitMq() {
    await this.consumerMessage.userLoginConsumer();
    await this.consumerMessage.userRegConsumer();
  }
}

export const userRouter = new UserRouter().router;
