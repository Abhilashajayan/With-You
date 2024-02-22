import mongoose ,{ Schema, Document } from "mongoose";
import { IUserSchema } from "../interfaces/IUserSchema";


const UserSchema = new Schema<IUserSchema>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: Date},
    phone: { type: Number },
    profilePicture: { type: String},
    gender: { type: String },
    interest: { type: [String]}, 
    status: { type: Boolean},
    createdAt: { type: Date, required: true },
});
export default mongoose.model<IUserSchema>("User", UserSchema);
