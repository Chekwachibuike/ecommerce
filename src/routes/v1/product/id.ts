import { Request, Response } from "express";
import { getProductByIdInput } from "../../../validationSchema/product";
import ProductRepository from "../../../database/repository/productRepo";
import APIResponse from "../../../utils/api";

const getProductByIdHandler = async (
  req: Request<getProductByIdInput>,
  res: Response
) => {
  try {
    const { id } = req.params;
    
    const product = await ProductRepository.getProductById(id);

    if (!product) {
      return APIResponse.error("Product not found", 404).send(res);
    }

    return APIResponse.success(product, 200).send(res);
  } catch (error: any) {
    console.error("Error in getProductByIdHandler:", error);
    return APIResponse.error("Failed to fetch product", 500).send(res);
  }
};

export default getProductByIdHandler;