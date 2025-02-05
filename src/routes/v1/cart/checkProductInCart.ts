
    import APIResponse from "../../../utils/api";
    import { Request, Response } from "express";
    import CartRepo from "../../../database/repository/cartRepo";
    import authenticateUser from "../../../middleware/authenticateUser";
    import { AddToCartInput, RemoveFromCartInput, ClearCartInput, GetCartInput, IsItemInCartInput } from "../../../validationSchema/cart";
    const isItemInCartHandler = async (
      req: Request & { user?: any }, 
      res: Response
    ) => {
      try {
        if (!req.user) {
          return APIResponse.error("Unauthorized", 401).send(res);
        }
    
        const userId = req.user._id;
        const { cartItemId } = req.body;
    
        if (cartItemId) {
          return APIResponse.error("Product ID is required", 400).send(res);
        }
    ;
    const isInCart = await CartRepo.isItemInCart(userId, cartItemId);
    return APIResponse.success({ isInCart }, 200).send(res);
    } catch (error) {
    return APIResponse.error("Internal Server Error", 500).send(res);
    }
    };
    export default isItemInCartHandler;