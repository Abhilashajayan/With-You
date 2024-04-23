import messageModel from "../models/message.models";
import { Ichat } from "../../adapters/interfaces/Imessage";
import { IMessage } from "../../adapters/interfaces/Imessage";
import { Iuser } from "../../adapters/interfaces/Imessage";
import { Document, Model } from "mongoose";
import { MessageEntity } from "../../entity/messageEntity";
import chatModel from "../models/chatModel";
import { messageUsecasesI } from "../../adapters/interfaces/ImessageUsecase";

export class messageRepository implements messageUsecasesI {
  private readonly Chat: Model<Ichat>;
  private readonly User: Model<Iuser>;
  private readonly Msg: Model<IMessage>;
  constructor(
    userModel: Model<Iuser>,
    chatModel: Model<Ichat>,
    msgModel: Model<IMessage>
  ) {
    this.User = userModel;
    this.Chat = chatModel;
    this.Msg = msgModel;
  }

  async addUser(user: Iuser): Promise<Iuser | null> {
    console.log(user , " the user is data");
    const existingUser = await this.User.findOne({ email: user.email });
    if (existingUser) {
      console.log("User with the same email already exists:", existingUser);
      return null;
    } else {
      const newUser = new this.User(user);
      return await newUser.save();
    }
  }
  
  async accessChat(userId: string , myid : string): Promise<any> {
    console.log(userId, myid , "both the id got here");
    var isChat: any = await chatModel
      .find({
        $and: [
          { users: { $elemMatch: { $eq: myid } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      })
      .populate("users")
      .populate("latestMessage");

    isChat = await this.User.populate(isChat, {
      path: "latestMessage.sender",
      select: "username profilePicture email",
    });
    if (isChat.length > 0) {
      return isChat[0];
    } else {
      var chatData = {
        chatName: "sender",
        users: [myid, userId],
      };

      try {
        const createdChat = await chatModel.create(chatData);
        return await chatModel
          .findOne({ _id: createdChat._id })
          .populate("users");
      } catch (err) {
        return err;
      }
    }
  }

  async fetchChat(userId : string): Promise<any> {
    try {
        console.log("Fetching chat");

        console.log("Fetching chat");
    
        const results = await this.Chat.find({ users: { $elemMatch: { $eq: userId } } })
            .populate("users")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (data: any) => {
                return await this.User.populate(data, {
                    path: "users",
                    select: "username profilePicture email",
                });
            });

        return results;
    } catch (error) {
        console.error("Error fetching chat:", error);
        throw error;
    }
}

async allMessages(userId: string): Promise<any> {
  try {
      console.log(userId);
   const message =   await messageModel.find({ chat: userId})
      // .populate("sender", "username profilePicture email")
      .populate("chat");
  console.log(message);
  return message;
  } catch (error) {
    return error;
  }
}

async sendMessage(content: string, chatId: string, userId : string): Promise<any> {

  var newMessage = {
      sender: userId,
      content: content,
      chat: chatId,
    };
    var message: any = await messageModel.create(newMessage);
    console.log(message);
    // message = await message.populate("sender", "username profilePicture")
    message = await message.populate("chat")
    // message = await this.User.populate(message, {
    //   path: "chat.users",
    //   select: "username profilePicture email",
    // });

    await this.Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    return message;
}
}
