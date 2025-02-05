import { BillingInformation } from "../models/billingInfo";
import { DocumentType, Ref } from "@typegoose/typegoose";
import { User } from "../models/user";
import {
    getModelForClass,
  } from "@typegoose/typegoose";
const BillingInfoModel = getModelForClass(BillingInformation);

class BillingInfoRepo {
  // Create a new billing information entry
  static async createBillingInfo(data: Partial<BillingInformation>): Promise<DocumentType<BillingInformation> | null> {
    try {
      const billingInfo = new BillingInfoModel(data);
      return await billingInfo.save();
    } catch (error) {
      console.error("Error creating billing information:", error);
      return null;
    }
  }

  // Get billing information by user ID
  static async getBillingInfoByUserId(userId: Ref<User>): Promise<DocumentType<BillingInformation> | null> {
    try {
      return await BillingInfoModel.findOne({ userId }).exec();
    } catch (error) {
      console.error("Error fetching billing information:", error);
      return null;
    }
  }

  // Update billing information for a user
  static async updateBillingInfo(
    userId: Ref<User>, 
    updateData: Partial<BillingInformation>
  ): Promise<DocumentType<BillingInformation> | null> {
    try {
      return await BillingInfoModel.findOneAndUpdate(
        { userId }, 
        updateData, 
        { new: true }
      ).exec();
    } catch (error) {
      console.error("Error updating billing information:", error);
      return null;
    }
  }

  // Delete billing information by user ID
  static async deleteBillingInfo(userId: Ref<User>): Promise<boolean> {
    try {
      const result = await BillingInfoModel.deleteOne({ userId }).exec();
      return result.deletedCount > 0;
    } catch (error) {
      console.error("Error deleting billing information:", error);
      return false;
    }
  }

  // Get all billing information entries (with optional pagination)
  static async getAllBillingInfo(
    page: number = 1, 
    limit: number = 10
  ): Promise<{
    billingInfo: DocumentType<BillingInformation>[],
    total: number
  }> {
    try {
      const skip = (page - 1) * limit;
      
      const [billingInfo, total] = await Promise.all([
        BillingInfoModel.find()
          .skip(skip)
          .limit(limit)
          .exec(),
        BillingInfoModel.countDocuments()
      ]);

      return { billingInfo, total };
    } catch (error) {
      console.error("Error fetching all billing information:", error);
      return { billingInfo: [], total: 0 };
    }
  }
}

export default BillingInfoRepo;