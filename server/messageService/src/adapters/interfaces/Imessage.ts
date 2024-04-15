import { Document,ObjectId, Types } from "mongoose";

export interface Ichat extends Document {
    chatName: string,
    users: Types.ObjectId,
    latestMessage: Types.ObjectId
}

export interface Iuser extends Document {
    userId? : Types.ObjectId;
    username : string;
    email : string;
    profilePicture: string;
}


export interface IMessage extends Document {
    sender: Types.ObjectId,
    content: string,
    chat: Types.ObjectId,
    readBy: Types.ObjectId
}