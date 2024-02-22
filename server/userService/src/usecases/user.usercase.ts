import { IUserSchema } from "../interfaces/IUserSchema";
import { IUserCase } from "../interfaces/IUserUsecase";
import { userRepository } from "../adapters/repositories/user.repo";
import { UserEntity } from "../entity/user.entity";

export class UserUsecase implements IUserCase{

    constructor(private UserRepository:userRepository ){}

    async register(user: UserEntity): Promise<void> {
      return this.UserRepository.register(user);
    }
    async login(data:UserEntity): Promise<void> {
      return this.UserRepository.login(data);
    }
    
}