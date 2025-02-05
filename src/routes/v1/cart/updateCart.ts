// import APIResponse from "../../../utils/api";
// import { Request, Response } from "express";
// import CartRepo from "../../../database/repository/cartRepo";
// import authenticateUser from "../../../middleware/authenticateUser";

// const updateCartSubtotalHandler = async (
//   req: Request & { user?: any }, 
//   res: Response
// ) => {
//   try {
//     if (!req.user) {
//       return APIResponse.error("Unauthorized", 401).send(res);
//     }

//     const userId = req.user._id;
//     const { subtotal } = req.body;

//     if (!subtotal) {
//       return APIResponse.error("Subtotal is required", 400).send(res);
//     }

//     const updatedCart = await CartRepo.updateCartSubtotal(userId, subtotal);

//     if (!updatedCart) {
//       return APIResponse.error("Failed to update cart subtotal", 500).send(res);
//     }

//     return APIResponse.success(updatedCart, 200).send(res);

//   } catch (error) {
//     return APIResponse.error("Internal Server Error", 500).send(res);
//   }
// };

// export default updateCartSubtotalHandler;