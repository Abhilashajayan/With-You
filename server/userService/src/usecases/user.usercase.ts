import { IUserSchema } from "../interfaces/IUserSchema";
import { IUserCase } from "../interfaces/IUserUsecase";
import { userRepository } from "../adapters/repositories/user.repo";
import { UserEntity } from "../entity/user.entity";
import { Request } from "express";

export class UserUsecase implements IUserCase{

    constructor(private UserRepository:userRepository ){}

    async register(user: UserEntity): Promise<void> {
      return this.UserRepository.register(user);
    }
    async login(data:UserEntity): Promise<void> {
      return this.UserRepository.login(data);
    }

   async getAllUsers(): Promise<any> {
      return this.UserRepository.getAllUsers();
    }
  
   async editUser(userId: string, data: UserEntity , req : any): Promise<void> {
       return this.UserRepository.editUser(userId, data, req);
   }  
}