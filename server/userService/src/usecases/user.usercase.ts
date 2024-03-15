import { IUserSchema } from "../adapters/interfaces/IUserSchema";
import { IUserCase } from "../adapters/interfaces/IUserUsecase";
import { userRepository } from "../frameworks/repositories/user.repo";
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

    async changePassword(data: any): Promise<void> {
        return this.UserRepository.changePassword(data);
    }
  
   async editUser(userId: string, data: UserEntity , req : any): Promise<void> {
       return this.UserRepository.editUser(userId, data, req);
   }  

   async getRandomUser(userId : string): Promise<any> {
       return this.UserRepository.getRandomUser(userId);
   }

   async matchUser(userId: string, likedUserId: string): Promise<any> {
       return this.UserRepository.matchUser(userId, likedUserId);
   }


}