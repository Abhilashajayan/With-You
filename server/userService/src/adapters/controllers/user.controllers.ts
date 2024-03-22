import { Request, Response } from "express";
import { UserUsecase } from "../../usecases/user.usercase";

export class UserController {
  private readonly userUsecase: UserUsecase;
  constructor(userUsecase: UserUsecase) {
    this.userUsecase = userUsecase;
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userUsecase.getAllUsers();
      return res.status(200).json({ users });
    } catch (error) {
      res.status(500).send("Error while adding address");
      console.log("Error while adding => ", error);
    }
  }

  async editUser(req: Request, res: Response) {
    try {
      const userId: string = req.params.userId;
      const data = req.body;
      const dataUser = await this.userUsecase.editUser(userId, data, req);
      return res.status(200).json({ dataUser });
    } catch (error) {
      res.status(500).send("Error while adding address");
      console.log("Error while adding => ", error);
    }
  }

  async getRandomUser(req: Request, res: Response) {
    try {
      const userId:string = req.params.userId;
      console.log(userId);  
      const users = await this.userUsecase.getRandomUser(userId);
      return res.status(200).json({ users });
    } catch (error) {
      res.status(500).send("Error while adding address");
      console.log("Error while adding => ", error);
    }
  }

  async matchUser(req: Request, res: Response) {
    try {
      const {userId , likedUserId} = req.body;
      console.log(userId, likedUserId);
      const likedData = await this.userUsecase.matchUser(userId , likedUserId);
      console.log(likedData, "the data");
      return res.status(200).json({ data: likedData , isLke : likedData.isMatched });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async blockUser(req: Request, res: Response) {
    try{
      const userId: string = req.params.userId;
      console.log("the ban user id is here getting ")
      const blockUser = await this.userUsecase.blockUser(userId);
      return res.status(200).json({ data: blockUser});
    }catch (error) {
      return res.status(500).json({ error });
    }
  }

  async blockStatus(req: Request, res: Response) {
    try{
      const userId: string = req.params.userId;
      console.log("the ban user id is here getting ", userId)
      const blockUser = await this.userUsecase.blockStatus(userId);
      return res.status(200).json({ data: blockUser});
    }catch (error) {
      return res.status(500).json({ error });
    }
  }
}
