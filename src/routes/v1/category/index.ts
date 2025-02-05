import { Router } from "express";
import getAllCategoriesHandler from "./all";
import createCategoryHandler from "./create";
import getCategoryByIdHandler from "./id";
import updateCategoryHandler from "./update";
import deleteCategoryHandler from "./delete";
import validate from "../../../middleware/validate";
import { 
  CategorySchema, 
  getCategoryById, 
  getAllCategoriesSchema,
  updateCategorySchema,
  deleteCategorySchema 
} from "../../../validationSchema/category";

const categoryRoutes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - image
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the category
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         name:
 *           type: string
 *           description: The name of the category
 *           example: Cookware
 *         image:
 *           type: string
 *           description: URL or path to the category image
 *           example: https://example.com/images/cookware.jpg
 *         description:
 *           type: string
 *           description: Detailed description of the category
 *           example: High-quality pots, pans, and other cooking essentials
 *         slug:
 *           type: string
 *           description: URL-friendly version of the category name
 *           example: cookware
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the category was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the category was last updated
 * 
 *     ApiResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Descriptive message about the API response
 *         data:
 *           oneOf:
 *             - $ref: '#/components/schemas/Category'
 *             - type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 * 
 * paths:
 *   /api/v1/categories/create:
 *     post:
 *       summary: Create a new kitchen category
 *       description: Create a new category for kitchen utensils with the provided details. A slug will be automatically generated.
 *       tags:
 *         - Categories
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - image
 *                 - description
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the category
 *                   example: Cookware
 *                 image:
 *                   type: string
 *                   description: URL or path to the category image
 *                   example: https://example.com/images/cookware.jpg
 *                 description:
 *                   type: string
 *                   description: Detailed description of the category
 *                   example: High-quality pots, pans, and other cooking essentials
 *       responses:
 *         201:
 *           description: Category created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponse'
 *         400:
 *           description: Validation error
 *         409:
 *           description: Category already exists
 *         500:
 *           description: Internal server error
 * 
 *   /api/v1/categories/all:
 *     get:
 *       summary: Get all kitchen categories
 *       description: Retrieve a list of all available kitchen categories
 *       tags:
 *         - Categories
 *       responses:
 *         200:
 *           description: List of categories retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponse'
 *         404:
 *           description: No categories found
 *         500:
 *           description: Internal server error
 * 
 *   /api/v1/categories/{id}:
 *     get:
 *       summary: Get kitchen category by ID
 *       description: Retrieve a specific kitchen category by its ID
 *       tags:
 *         - Categories
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Category ID
 *       responses:
 *         200:
 *           description: Category retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponse'
 *         404:
 *           description: Category not found
 *         500:
 *           description: Internal server error
 * 
 *     put:
 *       summary: Update kitchen category
 *       description: Update an existing kitchen category by its ID
 *       tags:
 *         - Categories
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Category ID
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the category
 *                 image:
 *                   type: string
 *                   description: URL or path to the category image
 *                 description:
 *                   type: string
 *                   description: Detailed description of the category
 *       responses:
 *         200:
 *           description: Category updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponse'
 *         400:
 *           description: Validation error
 *         404:
 *           description: Category not found
 *         500:
 *           description: Internal server error
 * 
 *     delete:
 *       summary: Delete kitchen category
 *       description: Delete a kitchen category by its ID
 *       tags:
 *         - Categories
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Category ID
 *       responses:
 *         200:
 *           description: Category deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponse'
 *         404:
 *           description: Category not found
 *         500:
 *           description: Internal server error
 */

categoryRoutes.post("/create", validate(CategorySchema), createCategoryHandler);
categoryRoutes.get("/all", validate(getAllCategoriesSchema), getAllCategoriesHandler);
categoryRoutes.get("/:id", validate(getCategoryById), getCategoryByIdHandler);
categoryRoutes.put("/:id", validate(updateCategorySchema), updateCategoryHandler);
categoryRoutes.delete("/:id", validate(deleteCategorySchema), deleteCategoryHandler);

export default categoryRoutes;

