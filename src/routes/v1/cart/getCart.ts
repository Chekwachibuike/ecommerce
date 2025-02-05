import APIResponse from "../../../utils/api";
import { Request, Response } from "express";
import CartRepo from "../../../database/repository/cartRepo";
import authenticateUser from "../../../middleware/authenticateUser";

const getCartHandler = async (
  req: Request & { user?: any }, 
  res: Response
) => {
  try {
    if (!req.user) {
      return APIResponse.error("Unauthorized", 401).send(res);
    }

    const userId = req.user._id;
    const cart = await CartRepo.getCartByUserId(userId);

    if (!cart) {
      return APIResponse.error("Cart not found", 404).send(res);
    }

    return APIResponse.success(cart, 200).send(res);

  } catch (error) {
    return APIResponse.error("Internal Server Error", 500).send(res);
  }
};

export default getCartHandler;