import { DocumentType } from "@typegoose/typegoose";
import { formatPhoneNumber } from "../../utils/formatters";
import UserModel, { User } from "../models/user";
export default class UserRepo {
  static createUser: (
    user: Omit<User, "verifyPassword" | "userCart" | "role">
  ) => Promise<User> = async (user) => {
    const { phoneNumber, ...rest } = user;
    return await UserModel.create({
      ...rest,
      phoneNumber: formatPhoneNumber(phoneNumber),
      
    });
  };

  static findByEmail: (
    emailAddress: string
  ) => Promise<DocumentType<User> | null> = async (emailAddress) => {
    return await UserModel.findOne({ emailAddress });
  };
  static getAllUsers: () => Promise<User[]> = async () => {
    const users = await UserModel.find();
    return users;
  };


  static updateUser: (
    updateParams: Partial<User>,
    id: string
  ) => Promise<Omit<User, "password"> | null> = async (updateParams, id) => {
    const { password, ...rest } = updateParams;
    const user = await this.findById(id);
    if (!user) return null;
    if (password) {
      user.password = password;
      user.save();
    }
    await UserModel.findByIdAndUpdate(id, rest);
    return rest as User;
  };

  static findById = async (id: string) => {
    return await UserModel.findById(id);
  };

  static deleteUser = async (id: string) => {
    return await UserModel.findByIdAndDelete(id);
  };
}
