import APIResponse from "../../../utils/api";
import { Request, Response } from "express";
import BillingInfoRepo from "../../../database/repository/billingInfoRepo";
import authenticateUser from "../../../middleware/authenticateUser";

const getBillingInfoHandler = async (
  req: Request & { user?: any }, 
  res: Response
) => {
  try {
    if (!req.user) {
      return APIResponse.error("Unauthorized", 401).send(res);
    }

    const userId = req.user._id;
    const billingInfo = await BillingInfoRepo.getBillingInfoByUserId(userId);

    if (!billingInfo) {
      return APIResponse.error("Billing information not found", 404).send(res);
    }

    return APIResponse.success(billingInfo, 200).send(res);

  } catch (error) {
    return APIResponse.error("Internal Server Error", 500).send(res);
  }
};

export default getBillingInfoHandler;