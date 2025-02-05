import CartItemModel from "../models/cartItem";
import ProductModel from "../models/product";
import { Types } from "mongoose";

class CartItemRepository {
  // Create a new cart item dynamically calculating totalPrice
  async createCartItem(productId: string, quantity: number) {
    // Fetch the product price
    const product = await ProductModel.findById(productId);
    if (!product) throw new Error("Product not found");

    // Calculate total price
    const totalPrice = product.price * quantity;

    // Create the cart item
    return await CartItemModel.create({
      product: new Types.ObjectId(productId),
      quantity,
      totalPrice,
    });
  }

  // Get a cart item by ID
  async getCartItemById(cartItemId: string) {
    return await CartItemModel.findById(cartItemId).populate("product");
  }

  // Get all cart items
  async getAllCartItems() {
    return await CartItemModel.find().populate("product");
  }

  // Update a cart item's quantity and dynamically recalculate total price
  async updateCartItem(cartItemId: string, quantity: number) {
    // Fetch the cart item
    const cartItem = await CartItemModel.findById(cartItemId).populate("product");
    if (!cartItem) throw new Error("Cart item not found");

    // Ensure product exists
    const product = await ProductModel.findById(cartItem.product);
    if (!product) throw new Error("Product not found");

    // Recalculate total price
    const totalPrice = product.price * quantity;

    // Update the cart item
    return await CartItemModel.findByIdAndUpdate(
      cartItemId,
      { quantity, totalPrice },
      { new: true }
    ).populate("product");
  }

  // Delete a cart item by ID
  async deleteCartItem(cartItemId: string) {
    return await CartItemModel.findByIdAndDelete(cartItemId);
  }

  // Get cart items by product ID
  async getCartItemsByProductId(productId: string) {
    return await CartItemModel.find({ product: new Types.ObjectId(productId) }).populate("product");
  }
}

export default new CartItemRepository();
