// import { Request, Response } from "express";
// import UserRepo from "../../../database/repository/userRepo";
// import { successResponse, errorResponse } from "../../../utils/helper";

// export const updateUserHandler = async (req: Request, res: Response):Promise<any> => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     const updatedUser = await UserRepo.updateUser(id, updateData);

//     if (updatedUser) {
//       return successResponse(res, {
//         message: "User updated successfully",
//         data: updatedUser,
//         statusCode: 200,
//         successCode: "USER_UPDATED_SUCCESSFULLY",
//       });
//     } else {
//       return errorResponse(res, {
//         message: "User not found",
//         statusCode: 404,
//         errorCode: "USER_NOT_FOUND",
//         details: null,
//       });
//     }
//   } catch (error) {
//     return errorResponse(res, {
//       message: "Failed to update user",
//       statusCode: 500,
//       errorCode: "FAILED_TO_UPDATE_USER",
//       details: error instanceof Error ? { error: error.message } : null,
//     });
//   }
// };
