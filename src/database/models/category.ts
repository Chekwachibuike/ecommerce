import {
  DocumentType,
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Severity,
} from "@typegoose/typegoose";
import * as argon2 from "argon2";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@pre<Category>("save", async function () {
  if (!this.isModified("sku")) return;
  const slugified = this.name.toLowerCase().split(" ").join("-");
  this.slug = slugified;
  return;
})
export class Category {
  @prop({ required: true })
  name!: string;
  @prop({ required: true })
  image!: string;
  @prop({ required: true })
  description!: string;
  @prop()
  slug: string;
}

const CategoryModel = getModelForClass(Category);
export default CategoryModel;
