import { Date, Document, Schema } from "mongoose";

export interface IMatchSchema extends Document {
    userId: Schema.Types.ObjectId;
    matchedUserId: Schema.Types.ObjectId;
    matchDate: Date;
}
