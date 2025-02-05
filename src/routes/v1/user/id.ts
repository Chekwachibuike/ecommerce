import { Request, Response } from "express";
import UserRepo from "../../../database/repository/userRepo";
import { successResponse, errorResponse } from "../../../utils/helper";

export const getUserByIdHandler = async(req:Request, res:Response):Promise<any> =>{
    try {
        const user = await UserRepo.findById(req.params.id);
        if (!user) {
            return errorResponse(res, {
                message: "User not found",
                statusCode: 404,
                errorCode: "USER_NOT_FOUND",
            });
        }
        return successResponse(res, {
            message: "User fetched successfully",
            data: user,
            statusCode: 200,
            successCode: "USER_FETCHED_SUCCESSFULLY",
        });
    } catch (error) {
        console.error("Error fetching user by id:", error);
        return errorResponse(res, {
            message: "An error occurred while fetching user",
            statusCode: 500,
            errorCode: "INTERNAL_SERVER_ERROR",
        });
    }
}