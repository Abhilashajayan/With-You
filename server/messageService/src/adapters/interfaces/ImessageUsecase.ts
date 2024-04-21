import { MessageEntity } from "../../entity/messageEntity";
import { Iuser } from "./Imessage";

export interface messageUsecasesI {
    addUser(user: Iuser): Promise<Iuser>;
  accessChat(userId: string, myid: string): Promise<any>;
  fetchChat(userId: string): Promise<any>;
  allMessages(userId: string): Promise<any>;
  sendMessage(content: string, chatId: string, userId: string): Promise<any>;
}
