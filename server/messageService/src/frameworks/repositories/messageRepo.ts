import messageModel from "../models/message.models";
import { Ichat } from "../../adapters/interfaces/Imessage";
import { IMessage } from "../../adapters/interfaces/Imessage";
import { Document, Model } from "mongoose";
import { MessageEntity } from "../../entity/messageEntity";
import chatModel from "../models/chatModel";
import { messageUsecasesI } from "../../adapters/interfaces/ImessageUsecase";


export class messageRepository implements messageUsecasesI {

    private readonly Chat : Model<Ichat>;
    private readonly Msg : Model<IMessage>;
    constructor(chatModel: Model<Ichat>, msgModel: Model<IMessage>) {
        this.Chat = chatModel;
        this.Msg = msgModel;
      }

      async accessChat(userId: string): Promise<any> {
        const myId = "65bd3239b2aa02db2a3b771c"
        var isChat: any = await chatModel.find({
            $and: [
              { users: { $elemMatch: { $eq: myId } } },
              { users: { $elemMatch: { $eq: userId } } },
            ],
          })
            .populate("users")
            .populate("latestMessage");
      
          if (isChat.length > 0) {
             return isChat[0];
          } else {
            var chatData = {
              chatName: "sender",
              users: [myId, userId],
            };
      
            try {
              const createdChat = await chatModel.create(chatData);
              return await chatModel.findOne({ _id: createdChat._id }).populate(
                "users",
              );
        
                 }catch(err){
                    return err;
                 }
            }
    }

    async fetchChat(): Promise<any> {
        try {
            const userId = "65bd3239b2aa02db2a3b771c";
            console.log("Fetching chat");
    
         
    
           
        } catch (error) {
            console.error("Error fetching chat:", error);
            throw error;
        }
    }
    
    async allMessages(userId: string): Promise<any> {
        try {
            console.log(userId);
         return  await this.Msg.find({ chat: userId})
            .populate("sender", "username profilePicture email")
            .populate("chat");
        } catch (error) {
          return error;
        }
    }

    async sendMessage(content: string, chatId: string): Promise<any> {
    
    }

    }
