import APIResponse from "../../../utils/api";
import { Request, Response } from "express";
import CategoryRepo from "../../../database/repository/categoryRepo";

const getAllCategoriesHandler = async (
  req: Request, 
  res: Response
) => {
  try {
    const categories = await CategoryRepo.getAllCategories();

    if (categories.length === 0) {
      return APIResponse.error("No categories found", 404).send(res);
    }

    return APIResponse.success(categories, 200).send(res);

  } catch (error) {
    return APIResponse.error("Internal Server Error", 500).send(res);
  }
};

export default getAllCategoriesHandler;