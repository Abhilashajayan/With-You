import { UserEntity } from "../../entity/user.entity";
import { IUserSchema } from "../../interfaces/IUserSchema";
import { IUserCase } from "../../interfaces/IUserUsecase";
import { Model } from "mongoose";
import bcrypt from "bcrypt";

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
}
