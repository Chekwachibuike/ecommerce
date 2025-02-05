import { Router } from "express";
import getAllCartItemsHandler from "./all";
import createCartItemHandler from "./create";
import getCartItemByIdHandler from "./id";
import getCartItemsByProductHandler from "./getbyproductid";
import updateCartItemHandler from "./update";
import deleteCartItemHandler from "./delete";
import validate from "../../../middleware/validate";
import {
  CreateCartItemSchema,
  GetCartItemSchema,
  GetCartItemsByProductSchema,
  UpdateCartItemSchema,
  DeleteCartItemSchema,
} from "../../../validationSchema/cartItem";

const cartItemsRoutes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the cart item
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         productId:
 *           type: string
 *           description: The ID of the product associated with this cart item
 *           example: 507f1f77bcf86cd799439011
 *         quantity:
 *           type: number
 *           description: The quantity of the product in the cart
 *           example: 2
 *         totalPrice:
 *           type: number
 *           description: The total price calculated from product price and quantity
 *           example: 49.98
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the cart item was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the cart item was last updated
 *
 * paths:
 *   /api/v1/cart-items/create:
 *     post:
 *       summary: Add an item to the cart
 *       description: Add a product to the cart with a specified quantity. The total price is calculated dynamically.
 *       tags:
 *         - Cart Items
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 *       responses:
 *         201:
 *           description: Cart item added successfully
 *         400:
 *           description: Validation error
 *         500:
 *           description: Internal server error
 *
 *   /api/v1/cart-items/all:
 *     get:
 *       summary: Get all cart items
 *       description: Retrieve all cart items in the system
 *       tags:
 *         - Cart Items
 *       responses:
 *         200:
 *           description: List of cart items retrieved successfully
 *         500:
 *           description: Internal server error
 *
 *   /api/v1/cart-items/{id}:
 *     get:
 *       summary: Get a cart item by ID
 *       description: Retrieve a specific cart item by its ID
 *       tags:
 *         - Cart Items
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Cart item ID
 *       responses:
 *         200:
 *           description: Cart item retrieved successfully
 *         404:
 *           description: Cart item not found
 *         500:
 *           description: Internal server error
 *
 *     put:
 *       summary: Update a cart item
 *       description: Update the quantity of a cart item
 *       tags:
 *         - Cart Items
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Cart item ID
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quantity:
 *                   type: number
 *                   description: The updated quantity of the product
 *       responses:
 *         200:
 *           description: Cart item updated successfully
 *         400:
 *           description: Validation error
 *         404:
 *           description: Cart item not found
 *         500:
 *           description: Internal server error
 *
 *     delete:
 *       summary: Remove a cart item
 *       description: Delete a cart item by its ID
 *       tags:
 *         - Cart Items
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Cart item ID
 *       responses:
 *         200:
 *           description: Cart item removed successfully
 *         404:
 *           description: Cart item not found
 *         500:
 *           description: Internal server error
 *
 *   /api/v1/cart-items/product/{productId}:
 *     get:
 *       summary: Get cart items by product ID
 *       description: Retrieve all cart items associated with a specific product
 *       tags:
 *         - Cart Items
 *       parameters:
 *         - in: path
 *           name: productId
 *           required: true
 *           schema:
 *             type: string
 *           description: Product ID
 *       responses:
 *         200:
 *           description: Cart items retrieved successfully
 *         404:
 *           description: No cart items found for this product
 *         500:
 *           description: Internal server error
 */


cartItemsRoutes.post("/create", validate(CreateCartItemSchema), createCartItemHandler);
cartItemsRoutes.get("/all", getAllCartItemsHandler);
cartItemsRoutes.get("/:id", validate(GetCartItemSchema), getCartItemByIdHandler);
cartItemsRoutes.get("/product/:productId", validate(GetCartItemsByProductSchema), getCartItemsByProductHandler);
cartItemsRoutes.put("/:id", validate(UpdateCartItemSchema), updateCartItemHandler);
cartItemsRoutes.delete("/:id", validate(DeleteCartItemSchema), deleteCartItemHandler);

export default cartItemsRoutes;
