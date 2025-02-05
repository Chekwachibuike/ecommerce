import { Router } from "express";
import addToCartHandler from "../cart/addToCart";
import getCartHandler from "./getCart";
import removeItemFromCartHandler from "./removeItem";
import clearCartHandler from "./clearCart";
import checkProductInCartHandler from "./checkProductInCart";
import validate from "../../../middleware/validate";
import authenticateUser from "../../../middleware/authenticateUser";
import { 
  AddToCartSchema,  
  ClearCartSchema,
  GetCartSchema,
  RemoveFromCartSchema,
  IsItemInCartSchema
} from "../../../validationSchema/cart";

const cartRoutes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               example: "12345"
 *             cartItemId:
 *               type: string
 *               example: "abcde"
 * paths:
 *   /api/v1/cart/add-to-cart:
 *     post:
 *       summary: Add an item to the cart
 *       description: Adds a specific item to the user's cart.
 *       tags: [Cart]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: The ID of the user
 *                   example: "12345"
 *                 cartItemId:
 *                   type: string
 *                   description: The ID of the item to add to the cart
 *                   example: "abcde"
 *       responses:
 *         200:
 *           description: Item successfully added to cart
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponse'
 *         400:
 *           description: Failed to add item to cart
 *         500:
 *           description: Internal server error
 * 
 *   /api/v1/cart/get-cart/{userId}:
 *     get:
 *       summary: Get the user's cart
 *       description: Retrieves the current cart of a user.
 *       tags: [Cart]
 *       parameters:
 *         - name: userId
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the user whose cart is to be retrieved
 *       responses:
 *         200:
 *           description: Cart successfully fetched
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponse'
 *         404:
 *           description: Cart not found
 *         500:
 *           description: Internal server error
 * 
 *   /api/v1/cart/remove-item-from-cart:
 *     post:
 *       summary: Remove an item from the cart
 *       description: Removes a specific item from the user's cart.
 *       tags: [Cart]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: The ID of the user
 *                   example: "12345"
 *                 cartItemId:
 *                   type: string
 *                   description: The ID of the item to remove from the cart
 *                   example: "abcde"
 *       responses:
 *         200:
 *           description: Item successfully removed from cart
 *         400:
 *           description: Failed to remove item from cart
 *         500:
 *           description: Internal server error
 * 
 *   /api/v1/cart/clear-cart:
 *     post:
 *       summary: Clear the user's cart
 *       description: Clears all items from the user's cart.
 *       tags: [Cart]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: The ID of the user
 *                   example: "12345"
 *       responses:
 *         200:
 *           description: Cart cleared successfully
 *         400:
 *           description: Failed to clear cart
 *         500:
 *           description: Internal server error
 * 
 *   /api/v1/cart/check-product-in-cart:
 *     post:
 *       summary: Check if an item exists in the cart
 *       description: Verifies whether a product is already in the user's cart.
 *       tags: [Cart]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: The ID of the user
 *                   example: "12345"
 *                 itemId:
 *                   type: string
 *                   description: The ID of the item to check
 *                   example: "abcde"
 *       responses:
 *         200:
 *           description: Product existence status in the cart
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   exists:
 *                     type: boolean
 *                     example: true
 *         500:
 *           description: Internal server error
 */

cartRoutes.post("/add-to-cart", authenticateUser, validate(AddToCartSchema), addToCartHandler);
cartRoutes.get("/get-cart", getCartHandler);
cartRoutes.post("/remove-item-from-cart", validate(RemoveFromCartSchema), removeItemFromCartHandler);
cartRoutes.post("/clear-cart", validate(ClearCartSchema), clearCartHandler);
cartRoutes.post("/check-product-in-cart", validate(IsItemInCartSchema), checkProductInCartHandler);

export default cartRoutes;
