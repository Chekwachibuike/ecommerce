import APIResponse from "../../../utils/api";
import CategoryRepo from "../../../database/repository/categoryRepo";
import { Request, Response } from "express";
import { getCategoryByIdInput } from "../../../validationSchema/category";

const getCategoryByIdHandler = async (req: Request<getCategoryByIdInput, {}, {}>, res: Response) => {
  try {
    const category = await CategoryRepo.getCategoryById(req.params.id);
    if (!category) {
      return APIResponse.error("Categories not found", 404).send(res);
    }
    return APIResponse.success(
      category,
      200
    ).send(res);
  } catch (error) {
    return APIResponse.error(
      "Internal Server Error",
      500
    ).send(res);
  }
};

export default getCategoryByIdHandler;