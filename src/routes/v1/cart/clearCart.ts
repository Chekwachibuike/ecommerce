import APIResponse from "../../../utils/api";
import { Request, Response } from "express";
import CartRepo from "../../../database/repository/cartRepo";
import authenticateUser from "../../../middleware/authenticateUser";

const clearCartHandler = async (
  req: Request & { user?: any }, 
  res: Response
) => {
  try {
    if (!req.user) {
      return APIResponse.error("Unauthorized", 401).send(res);
    }

    const userId = req.user._id;
    const cleared = await CartRepo.clearCart(userId);

    if (!cleared) {
      return APIResponse.error("Failed to clear cart", 500).send(res);
    }

    return APIResponse.success("Cart cleared successfully", 200).send(res);

  } catch (error) {
    return APIResponse.error("Internal Server Error", 500).send(res);
  }
};

export default clearCartHandler;