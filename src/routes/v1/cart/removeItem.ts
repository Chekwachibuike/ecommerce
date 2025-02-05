import APIResponse from "../../../utils/api";
import { Request, Response } from "express";
import CartRepo from "../../../database/repository/cartRepo";
import authenticateUser from "../../../middleware/authenticateUser";

const removeItemFromCartHandler = async (
  req: Request & { user?: any }, 
  res: Response
) => {
  try {
    if (!req.user) {
      return APIResponse.error("Unauthorized", 401).send(res);
    }

    const userId = req.user._id;
    const { cartItemId } = req.body;

    if (!cartItemId) {
      return APIResponse.error("Cart item ID is required", 400).send(res);
    }

    const cart = await CartRepo.removeFromCart(userId, cartItemId);

    if (!cart) {
      return APIResponse.error("Cart not found", 404).send(res);
    }

    return APIResponse.success(cart, 200).send(res);

  } catch (error) {
    return APIResponse.error("Internal Server Error", 500).send(res);
  }
};

export default removeItemFromCartHandler;