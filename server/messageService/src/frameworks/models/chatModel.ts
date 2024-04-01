import { Schema, model, Types, ObjectId } from "mongoose";
import { Ichat } from "../../adapters/interfaces/Imessage";

const chatSchema = new Schema<Ichat>(
    {
        chatName:{
            type: String
        },
        users: [{
            type: Schema.Types.ObjectId,
            ref: "userSchema"
        }],
        latestMessage: {
            type: Schema.Types.ObjectId,
            ref: "Message",
          },
    },
    {timestamps: true}
)

const chatModel = model<Ichat>("Chat", chatSchema)
export default chatModel;