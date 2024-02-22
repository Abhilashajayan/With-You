import { Request, Response } from "express";
import { UserUsecase } from "../../usecases/user.usercase";

export class UserController {
  
  private readonly userUsecase: UserUsecase;
  constructor(userUsecase: UserUsecase) {
    this.userUsecase = userUsecase;
  }
}
  