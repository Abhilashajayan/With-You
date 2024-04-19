import { MessageEntity } from "../../entity/messageEntity";

export interface messageUsecasesI {
  accessChat(userId: string, myid: string): Promise<any>;
  fetchChat(userId: string): Promise<any>;
  allMessages(userId: string): Promise<any>;
  sendMessage(content: string, chatId: string, userId: string): Promise<any>;
}
