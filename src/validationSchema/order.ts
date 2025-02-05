import { object, string, number, TypeOf } from "zod";
import { param } from "express-validator";

// Common fields for orders
const orderBaseSchema = object({
  userId: string({
    required_error: "User ID is required.",
  }).min(1),
  cartId: string({
    required_error: "Cart ID is required.",
  }).min(1),
  billingId: string({
    required_error: "Billing ID is required.",
  }).min(1),
  deliveryFee: number({
    required_error: "Delivery fee is required.",
  }).min(0, "Delivery fee cannot be negative."),
  vat: number({
    required_error: "VAT is required.",
  }).min(0, "VAT cannot be negative."),
  coupon: number().min(0, "Coupon cannot be negative.").optional(),
  subTotal: number({
    required_error: "Subtotal is required.",
  }).min(0, "Subtotal cannot be negative."),
  total: number({
    required_error: "Total is required.",
  }).min(0, "Total cannot be negative."),
  currency: string({
    required_error: "Currency is required.",
  }).min(1),
});

// Create order schema
export const CreateOrderSchema = object({
  body: orderBaseSchema,
});

// Update order schema
export const UpdateOrderSchema = object({
  body: object({
    orderId: string({
      required_error: "Order ID is required.",
    }).min(1),
    updateData: orderBaseSchema.partial(),
  }),
});

// Get order by ID schema
export const GetOrderByIdSchema = object({
  params: object({
    orderId: string({
      required_error: "Order ID is required.",
    }).min(1),
  }),
});

// Get orders by user validation schema
export const GetOrdersByUserValidationSchema = object({
  params: object({
    userId: string({
      required_error: "User ID is required",
    }).min(1),
  }),
});

// Delete order by ID schema
export const DeleteOrderByIdSchema = object({
  params: object({
    orderId: string({
      required_error: "Order ID is required.",
    }).min(1),
  }),
});

export type CreateOrderType = TypeOf<typeof CreateOrderSchema>["body"];
export type UpdateOrderType = TypeOf<typeof UpdateOrderSchema>["body"];
export type GetOrderByIdType = TypeOf<typeof GetOrderByIdSchema>["params"];
export type GetOrdersByUserValidationType = TypeOf<typeof GetOrdersByUserValidationSchema>["params"];
export type DeleteOrderByIdType = TypeOf<typeof DeleteOrderByIdSchema>["params"];
