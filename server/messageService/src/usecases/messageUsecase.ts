import { messageRepository } from "../frameworks/repositories/messageRepo";
import { messageUsecasesI } from "../adapters/interfaces/ImessageUsecase";



export class messageUsecase implements messageUsecasesI {
  constructor(private messageRepository: messageRepository){}   

  async accessChat(userId: string , myid : string): Promise<any> {
    return await this.messageRepository.accessChat(userId , myid);    
   }
  
  async fetchChat(userId : string): Promise<any> {
       return await this.messageRepository.fetchChat(userId);
   }
  
  async allMessages(userId: string): Promise<any> {
     return await this.messageRepository.allMessages(userId);    
  }
  
  async sendMessage(content: string, chatId: string , userId : string): Promise<any> {
     return await this.messageRepository.sendMessage(chatId , content , userId);    
  }
}