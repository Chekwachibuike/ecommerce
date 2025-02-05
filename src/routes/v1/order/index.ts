import express from 'express';
import createOrderHandler from './create';
import getOrderByIdHandler from './id';
import getOrdersByUserHandler from './get';
import updateOrderHandler from './update';
import deleteOrderHandler from './delete';
import validate from '../../../middleware/validate';
import { CreateOrderSchema, GetOrderByIdSchema, UpdateOrderSchema, DeleteOrderByIdSchema, GetOrdersByUserValidationSchema } from '../../../validationSchema/order';

const orderRoutes = express.Router();

// Create order route
orderRoutes.post('/create', 
  validate(CreateOrderSchema), 
  createOrderHandler
);

// Get order by ID route
orderRoutes.get('/:orderId', 
  validate(GetOrderByIdSchema), 
  getOrderByIdHandler
);

// Get orders by user ID route
orderRoutes.get('/user/:userId', 
  validate(GetOrdersByUserValidationSchema), // Use the correct schema
  getOrdersByUserHandler
);

// Update order route
orderRoutes.patch('/:orderId', 
  validate(UpdateOrderSchema), 
  updateOrderHandler
);

// Delete order route
orderRoutes.delete('/delete/:orderId', 
  validate(DeleteOrderByIdSchema), 
  deleteOrderHandler
);

export default orderRoutes;
/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - userId
 *         - cartId
 *         - billingId
 *         - deliveryFee
 *         - vat
 *         - subTotal
 *         - total
 *         - currency
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the order
 *         userId:
 *           type: string
 *           description: ID of the user who placed the order
 *         cartId:
 *           type: string
 *           description: ID of the user's cart associated with the order
 *         billingId:
 *           type: string
 *           description: ID of the billing information associated with the order
 *         deliveryFee:
 *           type: number
 *           description: Delivery fee for the order
 *         vat:
 *           type: number
 *           description: VAT applied to the order
 *         coupon:
 *           type: number
 *           description: Discount coupon applied to the order
 *         subTotal:
 *           type: number
 *           description: Subtotal amount of the order before any fees or discounts
 *         total:
 *           type: number
 *           description: Total price of the order after fees and discounts
 *         currency:
 *           type: string
 *           description: Currency used for the order (e.g., USD, EUR)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was last updated
 *     OrderUpdate:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: ID of the user who placed the order
 *         cartId:
 *           type: string
 *           description: ID of the user's cart associated with the order
 *         billingId:
 *           type: string
 *           description: ID of the billing information associated with the order
 *         deliveryFee:
 *           type: number
 *           description: Delivery fee for the order
 *         vat:
 *           type: number
 *           description: VAT applied to the order
 *         coupon:
 *           type: number
 *           description: Discount coupon applied to the order
 *         subTotal:
 *           type: number
 *           description: Subtotal amount of the order before any fees or discounts
 *         total:
 *           type: number
 *           description: Total price of the order after fees and discounts
 *         currency:
 *           type: string
 *           description: Currency used for the order (e.g., USD, EUR)
 *   parameters:
 *     OrderIdParam:
 *       in: path
 *       name: orderId
 *       required: true
 *       schema:
 *         type: string
 *       description: Unique identifier for the order
 *     UserIdParam:
 *       in: path
 *       name: userId
 *       required: true
 *       schema:
 *         type: string
 *       description: Unique identifier for the user
 * paths:
 *   /api/v1/orders/create:
 *     post:
 *       summary: Create a new order
 *       tags: [Orders]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       responses:
 *         201:
 *           description: Order created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Order'
 *         400:
 *           description: Invalid order data
 *         500:
 *           description: Server error
 *   /api/v1/orders/{orderId}:
 *     get:
 *       summary: Get an order by ID
 *       tags: [Orders]
 *       parameters:
 *         - $ref: '#/components/parameters/OrderIdParam'
 *       responses:
 *         200:
 *           description: Order retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Order'
 *         404:
 *           description: Order not found
 *         500:
 *           description: Server error
 *     patch:
 *       summary: Update an existing order
 *       tags: [Orders]
 *       parameters:
 *         - $ref: '#/components/parameters/OrderIdParam'
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderUpdate'
 *       responses:
 *         200:
 *           description: Order updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Order'
 *         400:
 *           description: Invalid update data
 *         404:
 *           description: Order not found
 *         500:
 *           description: Server error
 *     delete:
 *       summary: Delete an order by ID
 *       tags: [Orders]
 *       parameters:
 *         - $ref: '#/components/parameters/OrderIdParam'
 *       responses:
 *         200:
 *           description: Order deleted successfully
 *         404:
 *           description: Order not found
 *         500:
 *           description: Server error
 *   /api/v1/orders/user/{userId}:
 *     get:
 *       summary: Get all orders for a specific user
 *       tags: [Orders]
 *       parameters:
 *         - $ref: '#/components/parameters/UserIdParam'
 *       responses:
 *         200:
 *           description: Orders retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Order'
 *         404:
 *           description: No orders found for the user
 *         500:
 *           description: Server error
 */
