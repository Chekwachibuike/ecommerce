import { Request, Response } from "express";
import CartItemsRepo from "../../../database/repository/cartItemRepo";
import APIResponse from "../../../utils/api";
import { UpdateCartItemInput } from "../../../validationSchema/cartItem";

const updateCartItemHandler = async (
  req: Request<UpdateCartItemInput["params"], {}, UpdateCartItemInput["body"]>,
  res: Response
) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    const updatedCartItem = await CartItemsRepo.updateCartItem(cartItemId, quantity);
    if (!updatedCartItem) {
      return APIResponse.error("Cart item not found", 404).send(res);
    }
    
    APIResponse.success(updatedCartItem).send(res);
  } catch (error) {
    APIResponse.error((error as Error).message).send(res);
  }
};

export default updateCartItemHandler;
