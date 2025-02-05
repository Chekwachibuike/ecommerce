import APIResponse from "../../../utils/api";
import { Request, Response } from "express";
import { CreateCategory } from "../../../validationSchema/category";
import CategoryRepo from "../../../database/repository/categoryRepo";
import slugify from "slugify"; // Optional: To generate slugs

const createCategoryHandler = async (
  req: Request<{}, {}, CreateCategory>,
  res: Response
) => {
  try {
    // Validate that req.body exists and contains the required fields
    if (!req.body || !req.body.name) {
      return APIResponse.error("Category name is required", 400).send(res);
    }

    // Generate a slug dynamically if it doesn't exist
    const slug = slugify(req.body.name, { lower: true });

    // Check if the category already exists (by name or slug)
    const existingCategory = await CategoryRepo.getCategoryByNameOrSlug(
      req.body.name,
      slug
    );
    if (existingCategory) {
      return APIResponse.error("Category already exists!", 409).send(res);
    }

    // Create the new category
    const newCategory = await CategoryRepo.createCategory({
      ...req.body,
      slug, // Include the generated slug
    });

    // Respond with the created category
    return APIResponse.success(newCategory, 201).send(res);
  } catch (error: any) {
    console.error("Error creating category:", error.message);
    return APIResponse.error("Internal Server Error", 500).send(res);
  }
};

export default createCategoryHandler;
