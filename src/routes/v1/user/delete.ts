import { Request, Response } from "express";
import UserRepo from "../../../database/repository/userRepo";
import { successResponse, errorResponse } from "../../../utils/helper";

export const deleteUserHandler = async (req: Request, res: Response):Promise<any> => {
  try {
    const { id } = req.params;

    const deletedUser = await UserRepo.deleteUser(id);

    if (deletedUser) {
      return successResponse(res, {
        message: "User deleted successfully",
        data: deletedUser,
        statusCode: 200,
        successCode: "USER_DELETED_SUCCESSFULLY",
      });
    } else {
      return errorResponse(res, {
        message: "User not found",
        statusCode: 404,
        errorCode: "USER_NOT_FOUND",
        details: null,
      });
    }
  } catch (error) {
    errorResponse(res, {
      message: "Failed to delete user",
      statusCode: 500,
      errorCode: "FAILED_TO_DELETE_USER",
      details: error instanceof Error ? { error: error.message } : null,
    });
  }
};
