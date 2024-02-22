import { UserEntity } from "../entity/user.entity";

export interface IUserCase {
  register(user: UserEntity): Promise<void>;
  login(data:UserEntity ): Promise<void> ;
}