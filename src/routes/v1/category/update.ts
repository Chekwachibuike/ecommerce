import APIResponse from "../../../utils/api";
import { Request, Response } from "express";
import CategoryRepo from "../../../database/repository/categoryRepo";
import { updateCategoryInput } from "../../../validationSchema/category";

const updateCategoryHandler = async (
  req: Request<updateCategoryInput["params"], {}, updateCategoryInput["body"]>,
  res: Response
) => {
  try {
    const { id } = req.params;  
    const updateData = req.body;

    const updatedCategory = await CategoryRepo.updateCategory(id, updateData);

    if (updatedCategory) {
      APIResponse.success(updatedCategory, 200).send(res);
    } else {
      APIResponse.error("Category not found", 404).send(res);
    }
  } catch (error) {
    return APIResponse.error("Internal Server Error", 500).send(res);
  }
};

export default updateCategoryHandler;