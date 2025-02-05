import {
    DocumentType,
    getModelForClass,
    modelOptions,
    prop,
    Ref,
    Severity,
  } from "@typegoose/typegoose";
  import { User } from "./user"

  @modelOptions({
    schemaOptions: {
      timestamps: true,
    },
    options: {
      allowMixed: Severity.ALLOW,
    },
  })

  export class BillingInformation{
    @prop({required:true, ref: () => User })
    userId!: Ref<User>;

    @prop({required:true})
    address:string;

    @prop({required:true})
    country:string;

    @prop({required:true})
    zipCode:string;

    @prop({required:true})
    postalCode:string;
  }