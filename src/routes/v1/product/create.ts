import { Request, Response } from "express";
import mongoose from "mongoose";
import { CreateProduct } from "../../../validationSchema/product";
import ProductRepository from "../../../database/repository/productRepo";
import APIResponse from "../../../utils/api";

const createProductHandler = async (
  req: Request<{}, {}, CreateProduct>,
  res: Response
) => {
  try {
    const productInput = req.body;

    // Convert category string IDs to ObjectId references
    const categoryRefs = productInput.category.map((id) =>
      new mongoose.Types.ObjectId(id)
    );

    // Ensure the transformed object matches the expected Typegoose type
    const transformedProductInput = {
      ...productInput,
      category: categoryRefs, // Convert category to ObjectId[]
    };

    // Create the product using the repository
    const product = await ProductRepository.createProduct(transformedProductInput);

    return APIResponse.success(product, 201).send(res);
  } catch (error: any) {
    console.error("Error in createProductHandler:", error);
    
    if (error.message.includes("category")) {
      return APIResponse.error("Invalid category selection", 400).send(res);
    }

    return APIResponse.error("Failed to create product", 500).send(res);
  }
};

export default createProductHandler;
