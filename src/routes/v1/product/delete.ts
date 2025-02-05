import { Request, Response } from "express";
import { deleteProductByIdInput } from "../../../validationSchema/product";
import ProductRepository from "../../../database/repository/productRepo";
import APIResponse from "../../../utils/api";

const deleteProductHandler = async (
  req: Request<deleteProductByIdInput>,
  res: Response
) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const existingProduct = await ProductRepository.getProductById(id);
    if (!existingProduct) {
      return APIResponse.error("Product not found", 404).send(res);
    }

    // Delete the product
    const deletedProduct = await ProductRepository.deleteProduct(id);

    if (!deletedProduct) {
      return APIResponse.error("Failed to delete product", 400).send(res);
    }

    return APIResponse.success(deletedProduct, 200).send(res);
  } catch (error: any) {
    console.error("Error in deleteProductHandler:", error);
    return APIResponse.error("Failed to delete product", 500).send(res);
  }
};

export default deleteProductHandler;