import BillingInfoRepo from '../../../database/repository/billingInfoRepo';
import { Request, Response } from "express";

const getAllBillingInfoHandler = async (req:Request, res:Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { billingInfo, total } = await BillingInfoRepo.getAllBillingInfo(page, limit);
    res.status(200).json({ billingInfo, total });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching billing information' });
  }
};

export default getAllBillingInfoHandler;