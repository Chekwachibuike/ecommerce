import { DocumentType, Ref } from "@typegoose/typegoose";
import CartModel, { Cart } from "../models/cart";
import { User } from "../models/user";
import { CartItem } from "../models/cartItem";

class CartRepo {
  /**
   * Create a new cart for user
   */
  static async createCart(userId: Ref<User>): Promise<DocumentType<Cart> | null> {
    try {
      const cart = new CartModel({
        userId,
        cartItem: [],
        subTotal: 0
      });
      return await cart.save();
    } catch (error) {
      console.error("Error creating cart:", error);
      return null;
    }
  }

  /**
   * Get cart by user ID
   */
  static async getCartByUserId(userId: Ref<User>): Promise<DocumentType<Cart> | null> {
    try {
      return await CartModel.findOne({ userId })
        .populate('cartItem')
        .populate('userId')
        .exec();
    } catch (error) {
      console.error("Error fetching cart:", error);
      return null;
    }
  }

  /**
   * Add item to cart
   */
  static async addToCart(
    userId: Ref<User>,
    cartItem: Ref<CartItem>
  ): Promise<DocumentType<Cart> | null> {
    try {
      // Find or create cart
      let cart = await CartModel.findOne({ userId });
      if (!cart) {
        cart = await this.createCart(userId);
        if (!cart) throw new Error("Failed to create cart");
      }

      // Add item to cart
      cart.cartItem.push(cartItem);
      
      // Calculate new subtotal
      await this.calculateSubtotal(cart);
      
      return await cart.save();
    } catch (error) {
      console.error("Error adding item to cart:", error);
      return null;
    }
  }

  /**
   * Remove item from cart
   */
  static async removeFromCart(
    userId: Ref<User>,
    cartItemId: string
  ): Promise<DocumentType<Cart> | null> {
    try {
      const cart = await CartModel.findOne({ userId });
      if (!cart) return null;

      // Remove item from cart
      cart.cartItem = cart.cartItem.filter(
        (item: any) => item._id.toString() !== cartItemId
      );

      // Recalculate subtotal
      await this.calculateSubtotal(cart);
      
      return await cart.save();
    } catch (error) {
      console.error("Error removing item from cart:", error);
      return null;
    }
  }

  /**
   * Clear cart
   */
  static async clearCart(userId: Ref<User>): Promise<boolean> {
    try {
      const result = await CartModel.findOneAndUpdate(
        { userId },
        { 
          cartItem: [],
          subTotal: 0
        },
        { new: true }
      );
      return result !== null;
    } catch (error) {
      console.error("Error clearing cart:", error);
      return false;
    }
  }

  /**
   * Calculate cart subtotal
   */
  private static async calculateSubtotal(cart: DocumentType<Cart>): Promise<void> {
    try {
      const subtotal = cart.cartItem.reduce((total: number, item: any) => {
        return total + (item.price * item.quantity);
      }, 0);
      
      cart.subTotal = subtotal;
    } catch (error) {
      console.error("Error calculating subtotal:", error);
      cart.subTotal = 0;
    }
  }

  /**
   * Check if item exists in cart
   */
  static async isItemInCart(
    userId: Ref<User>,
    itemId: string
  ): Promise<boolean> {
    try {
      const cart = await CartModel.findOne({ userId });
      if (!cart) return false;

      return cart.cartItem.some((item: any) => 
        item._id.toString() === itemId
      );
    } catch (error) {
      console.error("Error checking item in cart:", error);
      return false;
    }
  }
}

export default CartRepo;