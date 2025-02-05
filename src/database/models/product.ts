import {
  DocumentType,
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Ref,
  Severity,
} from "@typegoose/typegoose";
import CategoryModel, { Category } from "./category";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@pre<Product>("save", async function () {
  if (!this.isModified("title") && !this.isModified("sku")) return;
  const randomDigit =
    Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  this.sku = randomDigit;
  const slugified = this.title.toLowerCase().split(" ").join("-");
  this.slug = slugified;
  return;
})
export class Product {
  @prop({ required: true })
  title!: string;
  @prop()
  feature: string;
  @prop({ required: true })
  price!: number;
  @prop({ ref: () => Category, required: true })
  category: Ref<Category>[];
  @prop({ required: true, default: false })
  inStock: boolean;
  @prop({ required: true })
  description!: string;
  @prop({ required: true, default: false })
  isFeatured!: boolean;
  @prop()
  sku: number;
  @prop({ required: true })
  quantity!: number;
  @prop({ required: true, default: true })
  isActive!: boolean;
  @prop()
  slug: string;
  @prop({ required: true })
  inTheBox!: string;
  @prop()
  relatedCategories: string[];
  @prop()
  productGallery: string[];
}

const ProductModel = getModelForClass(Product);
export default ProductModel;
