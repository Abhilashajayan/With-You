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

  async accessChat(userId: string): Promise<any> {
    const myId = "65bd3239b2aa02db2a3b771c";
    var isChat: any = await chatModel
      .find({
        $and: [
          { users: { $elemMatch: { $eq: myId } } },
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
        users: [myId, userId],
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

  async fetchChat(): Promise<any> {
    try {
        const userId = "65bd3239b2aa02db2a3b771c";
        console.log("Fetching chat");

        const results = await this.Chat.find({ users: { $elemMatch: { $eq: userId } } })
            .populate("users")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (data: any) => {
                return await this.User.populate(data, {
                    path: "latestMessage.sender",
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
   return  await this.Msg.find({ chat: userId})
      .populate("sender", "username profilePicture email")
      .populate("chat");
  } catch (error) {
    return error;
  }
}

async sendMessage(content: string, chatId: string): Promise<any> {
  const userId = "65bd3239b2aa02db2a3b771c"
  var newMessage = {
      sender: userId,
      content: content,
      chat: chatId,
    };
    var message: any = await messageModel.create(newMessage);

    message = await message.populate("sender", "username profilePicture")
    message = await message.populate("chat")
    message = await this.User.populate(message, {
      path: "chat.users",
      select: "username profilePicture email",
    });

    await this.Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    return message;
}
}
