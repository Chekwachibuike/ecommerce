import OrderModel, { Order } from "../models/order";
import { DocumentType, Ref } from "@typegoose/typegoose";
import { User } from "../models/user";
import { Cart } from "../models/cart";
import { BillingInformation } from "../models/billingInfo";

class OrderRepo {
  // Create a new order
  static async createOrder(data: Partial<Order>): Promise<DocumentType<Order> | null> {
    try {
      const order = new OrderModel(data);
      return await order.save();
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  }

  // Get an order by ID
  static async getOrderById(orderId: string): Promise<DocumentType<Order> | null> {
    try {
      return await OrderModel.findById(orderId)
        .populate("userId")
        .populate("cartId")
        .populate("billingId")
        .exec();
    } catch (error) {
      console.error("Error fetching order:", error);
      return null;
    }
  }

  // Get all orders for a user
  static async getOrdersByUser(userId: string): Promise<DocumentType<Order>[] | null> {
    try {
      return await OrderModel.find({ userId })
        .populate("cartId")
        .populate("billingId")
        .exec();
    } catch (error) {
      console.error("Error fetching orders for user:", error);
      return null;
    }
  }

  // Update an order by ID
  static async updateOrderById(
    orderId: string,
    updateData: Partial<Order>
  ): Promise<DocumentType<Order> | null> {
    try {
      return await OrderModel.findByIdAndUpdate(orderId, updateData, {
        new: true,
      })
        .populate("userId")
        .populate("cartId")
        .populate("billingId")
        .exec();
    } catch (error) {
      console.error("Error updating order:", error);
      return null;
    }
  }

  // Delete an order by ID
  static async deleteOrderById(orderId: string): Promise<boolean> {
    try {
      const result = await OrderModel.findByIdAndDelete(orderId);
      return result !== null;
    } catch (error) {
      console.error("Error deleting order:", error);
      return false;
    }
  }

  // Calculate total amount (recalculates the total if needed)
  static calculateTotal(
    subTotal: number,
    vat: number,
    deliveryFee: number,
    coupon: number = 0
  ): number {
    return subTotal + vat + deliveryFee - coupon;
  }
}

export default OrderRepo;
