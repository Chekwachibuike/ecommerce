import { Router } from "express";

import createUserHandler from "./create";
import validate from "../../../middleware/validate";
import { createUserSchema } from "../../../validationSchema/user";

const userRoutes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - password
 *         - emailAddress
 *         - phoneNumber
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           description: User's full name.
 *           example: John Doe
 *         password:
 *           type: string
 *           description: User's password. Must contain at least 8 characters, including an uppercase letter, lowercase letter, number, and special character.
 *           example: Password@123
 *         emailAddress:
 *           type: string
 *           description: User's email address.
 *           example: john.doe@example.com
 *         phoneNumber:
 *           type: string
 *           description: User's phone number (11 digits).
 *           example: 12345678901
 *         role:
 *           type: string
 *           enum:
 *             - user
 *             - consultant
 *           description: Role of the user. Must be either "user" or "consultant".
 *           example: user
 * 
 *     ApiResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Descriptive message about the API response.
 *           example: User created successfully
 *         data:
 *           $ref: '#/components/schemas/User'
 * 
 * paths:
 *   /api/v1/users/create:
 *     post:
 *       summary: Create a new user
 *       description: Register a new user by providing the required details.
 *       tags:
 *         - Users
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         201:
 *           description: User created successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponse'
 *         400:
 *           description: Validation error. Missing or invalid data in the request body.
 *         500:
 *           description: Internal server error. Indicates an issue on the server side.
 */

userRoutes.post("/create", validate(createUserSchema), createUserHandler);

export default userRoutes;
