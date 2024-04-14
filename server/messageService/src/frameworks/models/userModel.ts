import mongoose, { Document, Model, Schema } from 'mongoose';
import { Iuser } from "../../adapters/interfaces/Imessage";


const userSchema = new mongoose.Schema<Iuser>({
    username: {
      type: "string",
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String,
    },
  });
const userModel: Model<Iuser> = mongoose.model<Iuser>('userSchema', userSchema);

export default userModel;