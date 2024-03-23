import { IUserSchema } from "../adapters/interfaces/IUserSchema";
import { IUserCase } from "../adapters/interfaces/IUserUsecase";
import { userRepository } from "../frameworks/repositories/user.repo";
import { UserEntity } from "../entity/user.entity";
import { Request } from "express";

export class UserUsecase implements IUserCase {
  constructor(private UserRepository: userRepository) {}

  async register(user: UserEntity): Promise<void> {
    return this.UserRepository.register(user);
  }

  async login(data: UserEntity): Promise<void> {
    return this.UserRepository.login(data);
  }

  async googleAuth(data: UserEntity): Promise<void> {
    return this.UserRepository.googleAuth(data);
  }

  async getAllUsers(): Promise<any> {
    return this.UserRepository.getAllUsers();
  }

  async changePassword(data: any): Promise<void> {
    return this.UserRepository.changePassword(data);
  }

  async editUser(userId: string, data: UserEntity, req: any): Promise<void> {
    return this.UserRepository.editUser(userId, data, req);
  }

  async getRandomUser(userId: string): Promise<any> {
    return this.UserRepository.getRandomUser(userId);
  }

  async matchUser(userId: string, likedUserId: string): Promise<any> {
    return this.UserRepository.matchUser(userId, likedUserId);
  }

  async blockUser(userId: string): Promise<void> {
      return this.UserRepository.blockUser(userId);
  }

  async blockStatus(userId: string): Promise<void> {
      return this.UserRepository.blockStatus(userId);
  }

  async likedUsers(userId: string): Promise<void> {
      return this.UserRepository.likedUsers(userId);
  }
}
