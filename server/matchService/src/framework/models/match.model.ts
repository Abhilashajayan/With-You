import mongoose, { Model } from "mongoose";
import { IMatchSchema } from "../../adapters/interface/Imatch.Schema";

const matchSchema = new mongoose.Schema<IMatchSchema>({
  userId: {
    type: String,
    required: true,
  },
  matchedUserId: {
    type: String,
    required: true,
  },
  matchDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const MatchModel: Model<IMatchSchema> = mongoose.model<IMatchSchema>(
  "MatchModel",
  matchSchema
);
