import { AuthEntity } from "../entity/auth.entity";
export interface IUserUsecaes {
    registerUser(userData: AuthEntity):Promise<void>
    loginUser?(loginData: AuthEntity):Promise<string>;
    validateOtp(email:string,otp:number): Promise<boolean>;
}