import { AuthEntity } from "../entity/auth.entity";
import { IUserUsecaes } from "../adapters/interfaces/IAuthUsecase";
import { Rabiitmq } from "../frameworks/messageBroker/rabbitmq";
import { JwtService } from "../frameworks/jwt/jwtAuth";
import { AuthRepository } from "../frameworks/repositories/auth.repo";


export class authUsecases implements IUserUsecaes {
    constructor(private authRepository: AuthRepository ,private rabbitmqService: Rabiitmq,
      private jwtService: JwtService){}
    
    async registerUser(userData: AuthEntity):Promise<void> {
      await this.authRepository.registerUser(userData);
    }

    validateOtp(email:string ,otp: number): Promise<boolean> {
        return this.authRepository.validateOtp(email , otp);
    }
    
     async loginUser(loginData: AuthEntity):Promise<any> {
       console.log("loginUser");
        const userLogin:AuthEntity = loginData;
        console.log(userLogin);
       const reponse :any =  await this.rabbitmqService.publishLoginData(userLogin);
     
       if(reponse == null){
        console.log(reponse," response is received");
       }else{
        console.log(reponse,"the data");
        const data =   JSON.parse(reponse);
        const user : any = {
          id : data._id,
          username : data.username,
          email : data.email
        }

        console.log(user);
       const token = this.jwtService.generateToken(user);
       return { token, user , data };
       }
        console.log(userLogin);
    }

    async changePassword(email: string, password: string): Promise<void> {
      return this.authRepository.changePassword(email , password);
    }
}