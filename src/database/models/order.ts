import {
    DocumentType,
    getModelForClass,
    modelOptions,
    pre,
    prop,
    Ref,
    Severity,
  } from "@typegoose/typegoose";
  import {User} from "./user"
  import {Cart} from "./cart"
  import {BillingInformation} from "./billingInfo"

  @modelOptions({
    schemaOptions: {
      timestamps: true,
    },
    options: {
      allowMixed: Severity.ALLOW,
    },
  })

  export class Order{
    @prop({required:true, ref: () => User})
    userId: Ref<User>

    @prop({required:true, ref: () => User})
    cartId: Ref<Cart>

    @prop({required:true, ref: () => User})
    billingId: Ref<BillingInformation>

    @prop({required:true})
    deliveryFee:number

    @prop({required:true})
    vat:number

    @prop()
    coupon:number

    @prop({required:true})
    subTotal:number

    @prop({required:true})
    total:number

    @prop({required:true})
    currency:string

    
  }
const OrderModel = getModelForClass(Order);
export default OrderModel;