import { Router } from "express";

import createProductHandler from "./create";
import getAllProductsHandler from "./all";
import getProductByIdHandler from "./id";
import getProductByCategoryHandler from "./category";
import paginateProductHandler from "./paginate";
import updateProductbyIdHandler from "./update";
import deleteProductHandler from "./delete";
import validate from "../../../middleware/validate";
import { ProductSchema } from "../../../validationSchema/product";

const productRoutes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - category
 *         - description
 *         - quantity
 *         - inTheBox
 *         - productGallery
 *       properties:
 *         title:
 *           type: string
 *           description: Product title.
 *           example: Stainless Steel Chef Knife
 *         price:
 *           type: number
 *           description: Product price.
 *           example: 49.99
 *         category:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of category IDs.
 *           example: ["65a6c8e9f3b2d7a9c4d3b678"]
 *         description:
 *           type: string
 *           description: Product description.
 *           example: A premium stainless steel chef knife designed for precision cutting.
 *         quantity:
 *           type: number
 *           description: Available quantity.
 *           example: 100
 *         inStock:
 *           type: boolean
 *           description: Availability status.
 *           example: true
 *         isFeatured:
 *           type: boolean
 *           description: Whether the product is featured.
 *           example: true
 *         sku:
 *           type: number
 *           description: Stock keeping unit identifier.
 *           example: 987654
 *         isActive:
 *           type: boolean
 *           description: Whether the product is active.
 *           example: true
 *         slug:
 *           type: string
 *           description: URL-friendly product identifier.
 *           example: "stainless-steel-chef-knife"
 *         inTheBox:
 *           type: string
 *           description: Items included in the package.
 *           example: "Chef Knife, Protective Sheath, Sharpening Rod"
 *         relatedCategories:
 *           type: array
 *           items:
 *             type: string
 *           description: Related category IDs.
 *           example: ["65a6c8e9f3b2d7a9c4d3b789"]
 *         productGallery:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs of product images.
 *           example: ["https://example.com/chef-knife1.jpg", "https://example.com/chef-knife2.jpg"]
 *
 *     ApiResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Descriptive message about the API response.
 *           example: Product created successfully
 *         data:
 *           $ref: '#/components/schemas/Product'
 *
 * paths:
 *   /api/v1/products/create:
 *     post:
 *       summary: Create a new kitchen product
 *       description: Add a new kitchen utensil to the catalog.
 *       tags:
 *         - Products
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       responses:
 *         201:
 *           description: Product created successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponse'
 *         400:
 *           description: Validation error. Missing or invalid data in the request body.
 *         500:
 *           description: Internal server error.

 *   /api/v1/products/all:
 *     get:
 *       summary: Get all products
 *       description: Retrieve a list of all products in the catalog.
 *       tags:
 *         - Products
 *       responses:
 *         200:
 *           description: List of products
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Product'
 *         500:
 *           description: Internal server error.

 *   /api/v1/products/{id}:
 *     get:
 *       summary: Get product by ID
 *       description: Retrieve a product by its unique ID.
 *       tags:
 *         - Products
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The product ID
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Product found
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Product'
 *         404:
 *           description: Product not found

 *     put:
 *       summary: Update product by ID
 *       description: Update product information by its unique ID.
 *       tags:
 *         - Products
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The product ID
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       responses:
 *         200:
 *           description: Product updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponse'
 *         400:
 *           description: Validation error. Invalid data in the request body.
 *         404:
 *           description: Product not found
 *         500:
 *           description: Internal server error.

 *     delete:
 *       summary: Delete product by ID
 *       description: Delete a product by its unique ID.
 *       tags:
 *         - Products
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The product ID
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Product deleted successfully
 *         404:
 *           description: Product not found
 *         500:
 *           description: Internal server error.

 *   /api/v1/products/category/{categoryId}:
 *     get:
 *       summary: Get products by category
 *       description: Retrieve products by category.
 *       tags:
 *         - Products
 *       parameters:
 *         - name: categoryId
 *           in: path
 *           required: true
 *           description: The category ID
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: List of products in the category
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Product'
 *         404:
 *           description: Category not found
 *         500:
 *           description: Internal server error.

 *   /api/v1/products/paginate:
 *     get:
 *       summary: Paginate products
 *       description: Retrieve paginated products from the catalog.
 *       tags:
 *         - Products
 *       responses:
 *         200:
 *           description: Paginated product list
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   total:
 *                     type: number
 *                   items:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Product'
 *         500:
 *           description: Internal server error.

 */

// Routes for products
productRoutes.post("/create", validate(ProductSchema), createProductHandler);
productRoutes.get("/all", getAllProductsHandler);
productRoutes.get("/:id", getProductByIdHandler);
productRoutes.get("/category/:categoryId", getProductByCategoryHandler);
productRoutes.get("/paginate", paginateProductHandler);
productRoutes.put("/:id", validate(ProductSchema), updateProductbyIdHandler);
productRoutes.delete("/:id", deleteProductHandler);

export default productRoutes;
