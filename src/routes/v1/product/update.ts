import { Request, Response } from "express";
import { CreateProduct } from "../../../validationSchema/product";
import ProductRepo from "../../../database/repository/productRepo";
import ProductModel, { Product } from "../../../database/models/product";
import CategoryModel from "../../../database/models/category"; // ✅ Explicit Category import
import mongoose from "mongoose";

const updateProductbyIdHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData: Partial<CreateProduct> = req.body;

    // Ensure a valid ObjectId is provided
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid Product ID",
      });
      return; // Prevent further execution
    }

    // Convert category strings to ObjectIds
    let processedCategories: mongoose.Types.ObjectId[] | undefined;
    if (updateData.category) {
      processedCategories = updateData.category.map((catId) =>
        mongoose.Types.ObjectId.isValid(catId)
          ? new mongoose.Types.ObjectId(catId)
          : null
      ).filter(Boolean) as mongoose.Types.ObjectId[];

      // Verify if all provided categories exist
      const existingCategories = await CategoryModel.find({
        _id: { $in: processedCategories },
      });

      if (existingCategories.length !== processedCategories.length) {
        res.status(400).json({
          success: false,
          message: "One or more categories do not exist",
        });
        return; // Prevent further execution
      }
    }

    // Create a type-safe update object
    const productUpdateData: Partial<Product> = {
      ...updateData as Partial<Product>,
      category: processedCategories, // Assign the processed categories
    };

    // Perform the update
    const updatedProduct = await ProductRepo.updateProduct(id, productUpdateData);

    // Check if product was found and updated
    if (!updatedProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return; // Prevent further execution
    }

    // Return the updated product
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);

    // More robust error handling
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: "Failed to update product",
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};

export default updateProductbyIdHandler;
