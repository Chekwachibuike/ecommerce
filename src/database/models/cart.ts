import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
  Severity,
} from "@typegoose/typegoose";
import { User } from "./user";
import { CartItem } from "./cartItem";


@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Cart {
    
  @prop({required:true, ref: () => User })
  userId!: Ref<User>;

  @prop({ ref: () => CartItem })
  cartItem!: Ref<CartItem>[];  

  @prop({ default: 0 })
  subTotal!: number;
}

const CartModel = getModelForClass(Cart);
export default CartModel;