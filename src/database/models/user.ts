import {
  DocumentType,
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Ref,
  Severity,
} from "@typegoose/typegoose";
import * as argon2 from "argon2";


export const privateFields = ["password", "__v"];

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@pre<User>("save", async function () {
  if (!this.isModified("password")) return;
  const hash = await argon2.hash(this.password);
  this.password = hash;
  return;
})
export class User {
  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  password!: string;

  @prop({ unique: true, required: true })
  emailAddress!: string;

  @prop({ required: true })
  phoneNumber!: string;
  @prop({ required: true, enum: ["admin", "seller", "user"] })
  role!: string;

  async verifyPassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await argon2.verify(this.password, candidatePassword);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const UserModel = getModelForClass(User);
export default UserModel;
