import APIResponse from "../../../utils/api";
import { Request, Response } from "express";
import BillingInfoRepo from "../../../database/repository/billingInfoRepo";
import authenticateUser from "../../../middleware/authenticateUser";

const createBillingInfoHandler = async (
  req: Request & { user?: any }, 
  res: Response
) => {
  try {
    if (!req.user) {
      return APIResponse.error("Unauthorized", 401).send(res);
    }

    const userId = req.user._id;
    const data = req.body;

    const billingInfo = await BillingInfoRepo.createBillingInfo({ userId, ...data });

    if (!billingInfo) {
      return APIResponse.error("Failed to create billing information", 500).send(res);
    }

    return APIResponse.success(billingInfo, 201).send(res);

  } catch (error) {
    return APIResponse.error("Internal Server Error", 500).send(res);
  }
};

export default createBillingInfoHandler;