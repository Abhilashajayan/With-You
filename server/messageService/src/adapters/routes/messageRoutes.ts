import { Router, Request, Response } from 'express';
import { userController } from '../controllers/messegeController';
import { messageUsecase } from '../../usecases/messageUsecase';
import { messageRepository } from '../../frameworks/repositories/messageRepo';
import userModel from '../../frameworks/models/userModel';
import chatModel from '../../frameworks/models/chatModel';
import messageModel from '../../frameworks/models/message.models';

export class UserRouter {
    router = Router();

    constructor(){
        const userRepositorys = new messageRepository(userModel,chatModel,messageModel);
        const userUsecase = new messageUsecase(userRepositorys);
        const userControllers = new userController(userUsecase);

        this.router.post('/api/accessChat', (req: Request, res: Response) => {
            userControllers.access_user(req, res);
        });

        this.router.get('/api/fetchChat', (req: Request, res: Response) => {
            userControllers.fetch_chat(req, res);
        });

        this.router.get('/api/getmessage/:userId', (req: Request, res: Response) => {
            userControllers.all_messages(req, res);
        });

        this.router.post('/api/send', (req: Request, res: Response) => {
            userControllers.send_message(req, res);
        });


    }
}
export const userRouter = new UserRouter().router;