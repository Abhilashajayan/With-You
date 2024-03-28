import { UserEntity } from "../../entity/user.entity";

export interface IUserCase {
  register(user: UserEntity): Promise<void>;
  login(data:UserEntity ): Promise<void> ;
  getAllUsers(): Promise<any>;
  editUser(userId : string, data : UserEntity , req :  any): Promise<void>;
  getRandomUser(userId : string): Promise<any>;
  matchUser(userId : string, likedUserId : string): Promise<any>;
  changePassword(data : UserEntity): Promise<void>;
  googleAuth(authData : UserEntity) : Promise<void>;
  blockUser(userId : string ) : Promise<void>;
  userProfile(userId : string ) : Promise<void>;
  likedUsers(userId : string ) : Promise<void>;
}