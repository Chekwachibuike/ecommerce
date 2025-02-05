import CategoryModel, { Category } from "../models/category";

export default class CategoryRepo {
  static createCategory: (category: Category) => Promise<Category> = async (
    category
  ) => {
    return await CategoryModel.create(category);
  };

  static getCategoryById = async (id: string) => {
    return await CategoryModel.findById(id);
  };
  
  static getCategoryByNameOrSlug = async (name: string, slug: string) => {
    return await CategoryModel.findOne({
      $or: [{ name }, { slug }],
    });
  };

  static getAllCategories: () => Promise<Category[]> = async () => {
    return await CategoryModel.find();
  };

  static updateCategory = async (id: string, updateData: Partial<Category>) => {
    return await CategoryModel.findByIdAndUpdate(id, updateData, { new: true });
  };

  static deleteCategory = async (id: string) => {
    return await CategoryModel.findByIdAndDelete(id);
  };
}