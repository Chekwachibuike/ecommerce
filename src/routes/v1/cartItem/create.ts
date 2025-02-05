import { Request, Response } from "express";
import CartItemsRepo from "../../../database/repository/cartItemRepo";
import APIResponse from "../../../utils/api";
import { CreateCartItemInput } from "../../../validationSchema/cartItem";

const createCartItemHandler = async (
  req: Request<{}, {}, CreateCartItemInput>,
  res: Response
) => {
  try {
    const { productId, quantity } = req.body;
    const cartItem = await CartItemsRepo.createCartItem(productId, quantity);
    APIResponse.success(cartItem, 201).send(res);
  } catch (error) {
    APIResponse.error((error as Error).message).send(res);
  }
};

export default createCartItemHandler;
