import APIResponse from "../../../utils/api";
import { Request, Response } from "express";
import CategoryRepo from "../../../database/repository/categoryRepo";
import { deleteCategoryInput } from "../../../validationSchema/category";

const deleteCategoryHandler = async (
  req: Request<deleteCategoryInput, {}, {}>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const deletedCategory = await CategoryRepo.deleteCategory(id);

    if (deletedCategory) {
      APIResponse.success(
        deletedCategory,
        200
      ).send(res);
    } else {
      APIResponse.error("Category not found", 404).send(res);
    }
  } catch (error) {
    return APIResponse.error(
      "Internal Server Error",
      500    ).send(res);
  }
};

export default deleteCategoryHandler;