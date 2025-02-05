import { Router } from "express";
import createBillingInfoHandler from "./create";
// import getBillingInfoByUserIdHandler from "./id";
import updateBillingInfoHandler from "./update";
import deleteBillingInfoHandler from "./delete";
import getAllBillingInfoHandler from "./all";
import validate from "../../../middleware/validate";
import authenticateUser from "../../../middleware/authenticateUser";
import { 
    CreateBillingInfoSchema, 
    GetAllBillingInfoSchema, 
    DeleteBillingInfoSchema,
    UpdateBillingInfoSchema,
    GetByUserIdSchema
} from "../../../validationSchema/billingInfo";

const billingInfoRoutes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     BillingInfo:
 *       type: object
 *       required:
 *         - userId
 *         - address
 *         - country
 *         - zipCode
 *         - postalCode
 *       properties:
 *         userId:
 *           type: string
 *           description: Unique identifier of the user
 *           example: "65a6c8e9f3b2d7a9c4d3b678"
 *         address:
 *           type: string
 *           description: Billing address of the user
 *           example: "123 Main Street, Apt 4B"
 *         country:
 *           type: string
 *           description: Country of residence
 *           example: "United States"
 *         zipCode:
 *           type: string
 *           description: ZIP code of the billing address
 *           example: "10001"
 *         postalCode:
 *           type: string
 *           description: Postal code of the billing address
 *           example: "NY10001"
 *
 *     ApiResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: API response message
 *         data:
 *           oneOf:
 *             - $ref: '#/components/schemas/BillingInfo'
 *             - type: array
 *               items:
 *                 $ref: '#/components/schemas/BillingInfo'
 *
 * paths:
 *   /api/v1/billing-info/create:
 *     post:
 *       summary: Create new billing information
 *       description: Add billing information for a user.
 *       tags:
 *         - Billing Information
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BillingInfo'
 *       responses:
 *         201:
 *           description: Billing information created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponse'
 *         400:
 *           description: Validation error
 *         500:
 *           description: Internal server error
 *
 *   /api/v1/billing-info/all:
 *     get:
 *       summary: Retrieve all billing information
 *       description: Get all stored billing information.
 *       tags:
 *         - Billing Information
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         200:
 *           description: Successfully retrieved billing information
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponse'
 *         404:
 *           description: No billing information found
 *         500:
 *           description: Internal server error
 *
 *   /api/v1/billing-info/{userId}:
 *     get:
 *       summary: Get billing info by user ID
 *       description: Retrieve billing information for a specific user.
 *       tags:
 *         - Billing Information
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the user
 *       responses:
 *         200:
 *           description: Billing information retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponse'
 *         404:
 *           description: Billing information not found
 *         500:
 *           description: Internal server error
 *
 *     put:
 *       summary: Update billing information by user ID
 *       description: Update an existing billing record for a user.
 *       tags:
 *         - Billing Information
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the user
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BillingInfo'
 *       responses:
 *         200:
 *           description: Billing information updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponse'
 *         400:
 *           description: Validation error
 *         404:
 *           description: Billing information not found
 *         500:
 *           description: Internal server error
 *
 *     delete:
 *       summary: Delete billing information by user ID
 *       description: Remove billing information for a user.
 *       tags:
 *         - Billing Information
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: userId
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the user
 *       responses:
 *         200:
 *           description: Billing information deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponse'
 *         404:
 *           description: Billing information not found
 *         500:
 *           description: Internal server error
 */

billingInfoRoutes.post("/create", authenticateUser, validate(CreateBillingInfoSchema), createBillingInfoHandler);
billingInfoRoutes.get("/all", validate(GetAllBillingInfoSchema),  getAllBillingInfoHandler);
// billingInfoRoutes.get("/:userId", validate(GetByUserIdSchema), authenticateUser, getBillingInfoByUserIdHandler);
billingInfoRoutes.put("/:userId", validate(UpdateBillingInfoSchema),  updateBillingInfoHandler);
billingInfoRoutes.delete("/:userId", validate(DeleteBillingInfoSchema),  deleteBillingInfoHandler);

export default billingInfoRoutes;
