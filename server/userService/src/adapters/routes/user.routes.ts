import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controllers";
import { userRepository } from "../../frameworks/repositories/user.repo";
import userModel from "../../frameworks/models/user.model";
import { UserUsecase } from "../../usecases/user.usercase";
import { rabbitmq } from "../../frameworks/messageBroker/rabbitmq";
import multerConfig from "../../frameworks/services/multer";
import authenticateToken from "../middleware/authToken";

export class UserRouter {
  router = Router();

  userRepository = new userRepository(userModel);
  userUsecase = new UserUsecase(this.userRepository);
  consumerMessage = new rabbitmq(this.userUsecase);
  userController = new UserController(this.userUsecase);

  constructor() {
    this.router.get("/user/getAllUsers", (req: Request, res: Response) => {
      this.userController.getAllUsers(req, res);
    });

    this.router.get("/user/getRandomUser/:userId",authenticateToken, (req: Request, res: Response) => {
      this.userController.getRandomUser(req, res);
    });

    this.router.post( 
      "/user/editUser/:userId",
      multerConfig.single("uploadPic"),authenticateToken,
      (req: Request, res: Response) => {
        this.userController.editUser(req, res);
        console.log(req.files, "hhh");
      }
    );

    this.router.post("/user/likeUser",authenticateToken, (req: Request, res: Response) => {
      this.userController.matchUser(req, res);
    });

    this.router.post("/user/block/:userId", (req: Request, res: Response) => {
      this.userController.blockUser(req, res);
    });

    this.router.get("/user/blockStatus/:userId", (req: Request, res: Response) => {
      this.userController.blockStatus(req, res);
    });
  }

  async rabbitMq() {
    await this.consumerMessage.userLoginConsumer();
    await this.consumerMessage.userRegConsumer();
    await this.consumerMessage.changePassConsumer();
    await this.consumerMessage.googleAuthConsumer();
  }
}

export const userRouter = new UserRouter().router;
