import { UserEntity } from "../../entity/user.entity";
import { IUserSchema } from "../../interfaces/IUserSchema";
import { IUserCase } from "../../interfaces/IUserUsecase";
import { Model } from "mongoose";
import bcrypt from "bcrypt";
import cloudinary from "../../frameworks/services/cloudinary";

export class userRepository implements IUserCase {
    private readonly UserModel: Model<IUserSchema>;

    constructor(UserModel: Model<IUserSchema>) {
        this.UserModel = UserModel;
    }

    async register(user: UserEntity): Promise<void> {
        try {
            console.log("user repo", user);
            const password = user.password;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new this.UserModel({
                ...user,
                password: hashedPassword,
            });
            await newUser.save();
            console.log(newUser);
        } catch (error) {
            console.error("Registration failed:", error);
            throw new Error("Registration failed");
        }
    }

    async login(data: UserEntity): Promise<any> {
        try {
            console.log("check user");
            const email = data.email;
            const password = data.password;
            const user = await this.UserModel.findOne({ email: email }).exec();

            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch) {
                    console.log('Login successful');
                    return user;
                } else {
                    console.log('Password mismatch');
                    return false;
                }
            } else {
                console.log('User not found');
                return false;
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error("Login failed");
        }
    }

    async getAllUsers(): Promise<any> {
        try {
          const allUsers = await this.UserModel.find({},{password:0});
          console.log("get all user details ", allUsers);
          return allUsers
        } catch (error) {
          console.error("Fetching all users failed:", error);
          throw new Error("Error while fetching all users");
        }
      }

      async editUser(userId: string, data: UserEntity, req: any): Promise<any> {
        try {
          if (req.files && req.files['image1']) {
            const folderName = "Bea";
            const result = await cloudinary.uploader.upload(req.files['image1'][0].path, { public_id: `${folderName}/${req.files['image1'][0].originalname}` });
      
            const updatedUserWithImage = await this.UserModel.findOneAndUpdate(
              { _id: userId },
              {
                $set: {
                  ...data,
                  profilePicture: result?.secure_url,
                },
              },
              { new: true }
            );
      
            console.log("Cloudinary result:", result);
            console.log("Updated user with image:", updatedUserWithImage);
      
            return updatedUserWithImage;
          } else {
            const updatedUserWithoutImage = await this.UserModel.findOneAndUpdate(
              { _id: userId },
              {
                $set: {
                  ...data,
                },
              },
              { new: true }
            );
      
            console.log("Updated user without image:", updatedUserWithoutImage);
      
            return updatedUserWithoutImage;
          }
        } catch (error) {
          console.error("Editing user failed:", error);
          throw new Error("Error while editing user");
        }
      }
      
      



      
}
