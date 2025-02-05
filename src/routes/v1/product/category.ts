import { Request, Response } from "express";
import { getProductsByCategoryIdInput } from "../../../validationSchema/product";
import ProductRepository from "../../../database/repository/productRepo";
import APIResponse from "../../../utils/api";

const getProductsByCategoryHandler = async (
  req: Request<getProductsByCategoryIdInput>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const products = await ProductRepository.getProductsByCategory(id);

    if (!products || products.length === 0) {
      return APIResponse.error("No products found for this category", 404).send(res);
    }

    return APIResponse.success(products, 200).send(res);
  } catch (error: any) {
    console.error("Error in getProductsByCategoryHandler:", error);
    
    if (error.message.includes("Category not found")) {
      return APIResponse.error("Invalid category ID", 400).send(res);
    }

    return APIResponse.error("Failed to fetch products", 500).send(res);
  }
};

export default getProductsByCategoryHandler;