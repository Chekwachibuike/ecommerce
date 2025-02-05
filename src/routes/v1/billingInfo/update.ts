import APIResponse from "../../../utils/api";
import { Request, Response } from "express";
import BillingInfoRepo from "../../../database/repository/billingInfoRepo";
import authenticateUser from "../../../middleware/authenticateUser";

const updateBillingInfoHandler = async (
  req: Request & { user?: any }, 
  res: Response
) => {
  try {
    if (!req.user) {
      return APIResponse.error("Unauthorized", 401).send(res);
    }

    const userId = req.user._id;
    const data = req.body;

    const updatedBillingInfo = await BillingInfoRepo.updateBillingInfo(userId, data);

    if (!updatedBillingInfo) {
      return APIResponse.error("Failed to update billing information", 500).send(res);
    }

    return APIResponse.success(updatedBillingInfo, 200).send(res);

  } catch (error) {
    return APIResponse.error("Internal Server Error", 500).send(res);
  }
};

export default updateBillingInfoHandler;