import { MessageEntity } from "../../entity/messageEntity";

export interface messageUsecasesI{
    accessChat(userId : string): Promise<any>;
    fetchChat(): Promise<any>;
    allMessages(userId : string): Promise<any>;
    sendMessage(content : string , chatId : string): Promise<any>;
}