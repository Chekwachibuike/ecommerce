import APIResponse from "../../../utils/api";
import { Request, Response } from "express";
import CartRepo from "../../../database/repository/cartRepo";
import mongoose from 'mongoose';
import { AddToCartSchema, AddToCartInput } from "../../../validationSchema/cart";

const addToCartHandler = async (
  req: Request & { user?: any }, 
  res: Response
) => {
  try {
    if (!req.user) {
      return APIResponse.error("Unauthorized", 401).send(res);
    }

    // Convert string IDs to ObjectIds
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const cartItems = req.body.cartItem?.map(
      (item: string) => new mongoose.Types.ObjectId(item)
    ) || [];

    // Validate request body
    const validationResult = AddToCartSchema.safeParse({
      userId: req.user._id,
      cartItem: req.body.cartItem,
      subTotal: req.body.subTotal
    });

    if (!validationResult.success) {
      return APIResponse.error(
        validationResult.error.errors[0].message, 
        400
      ).send(res);
    }

    const cart = await CartRepo.addToCart(
      userId,
      cartItems
    );

    if (!cart) {
      return APIResponse.error("Failed to add item to cart", 500).send(res);
    }

    return APIResponse.success(cart, 200).send(res);

  } catch (error) {
    console.error("Add to cart error:", error);
    return APIResponse.error("Internal Server Error", 500).send(res);
  }
};

export default addToCartHandler;