import { Schema, model, Types, ObjectId } from "mongoose";
import { IMessage } from "../../adapters/interfaces/Imessage";

const messageSchema = new Schema<IMessage>(
    {
        sender:{
            type: Schema.Types.ObjectId,
            ref: "User",
            
        },
        content: {
            type: String,
            trim: true
        },
        chat: {
            type: Schema.Types.ObjectId,
            ref:"Chat"
        },
        readBy: [{
            type: Schema.Types.ObjectId,
            ref: "userSchema"
        }]
    },
    {timestamps: true}
)

const messageModel = model<IMessage>("Message", messageSchema)

export default messageModel;