import { Request, Response } from "express";
import CartItemsRepo from "../../../database/repository/cartItemRepo";
import APIResponse from "../../../utils/api";
import { GetCartItemsByProductInput } from "../../../validationSchema/cartItem";

const getCartItemsByProductHandler = async (
  req: Request<GetCartItemsByProductInput>,
  res: Response
) => {
  try {
    const { productId } = req.params;
    const cartItems = await CartItemsRepo.getCartItemsByProductId(productId);

    APIResponse.success(cartItems).send(res);
  } catch (error) {
    APIResponse.error((error as Error).message).send(res);
  }
};

export default getCartItemsByProductHandler;
