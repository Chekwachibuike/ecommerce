import { Request, Response } from "express";
import CartItemsRepo from "../../../database/repository/cartItemRepo";
import APIResponse from "../../../utils/api";
import { DeleteCartItemInput } from "../../../validationSchema/cartItem";

const deleteCartItemHandler = async (
  req: Request<DeleteCartItemInput>,
  res: Response
) => {
  try {
    const { cartItemId } = req.params;
    const deletedCartItem = await CartItemsRepo.deleteCartItem(cartItemId);

    if (!deletedCartItem) {
      return APIResponse.error("Cart item not found", 404).send(res);
    }

    APIResponse.success({ message: "Cart item deleted successfully" }).send(res);
  } catch (error) {
    APIResponse.error((error as Error).message).send(res);
  }
};

export default deleteCartItemHandler;
