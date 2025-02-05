import { Request, Response } from "express";
import CartItemsRepo from "../../../database/repository/cartItemRepo";
import APIResponse from "../../../utils/api";

const getAllCartItemsHandler = async (_req: Request, res: Response) => {
  try {
    const cartItems = await CartItemsRepo.getAllCartItems();
    APIResponse.success(cartItems).send(res);
  } catch (error) {
    APIResponse.error((error as Error).message).send(res);
  }
};

export default getAllCartItemsHandler;
