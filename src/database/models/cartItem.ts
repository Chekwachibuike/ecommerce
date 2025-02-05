import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
  Ref,
} from "@typegoose/typegoose";
import { Product } from "./product";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class CartItem {
  @prop({ required: true, ref: () => Product })
  product!: Ref<Product>;
  @prop({ required: true })
  quantity!: number;
  @prop({ required: true })
  totalPrice!: number;
}

const CartItemModel = getModelForClass(CartItem);
export default CartItemModel;
