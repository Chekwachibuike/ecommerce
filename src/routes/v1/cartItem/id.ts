import { Request, Response } from "express";
import CartItemsRepo from "../../../database/repository/cartItemRepo";
import APIResponse from "../../../utils/api";
import { GetCartItemInput } from "../../../validationSchema/cartItem";

const getCartItemHandler = async (
  req: Request<GetCartItemInput>,
  res: Response
) => {
  try {
    const { cartItemId } = req.params;
    const cartItem = await CartItemsRepo.getCartItemById(cartItemId);
    if (!cartItem) {
      return APIResponse.error("Cart item not found", 404).send(res);
    }
    APIResponse.success(cartItem).send(res);
  } catch (error) {
    APIResponse.error((error as Error).message).send(res);
  }
};

export default getCartItemHandler;
