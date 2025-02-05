import { object, string, number, z } from "zod";

// Validation schema for creating a cart item
export const CreateCartItemSchema = object({
  body: object({
    productId: string({
      required_error: "Product ID is required",
    }),
    quantity: number({
      required_error: "Quantity is required",
    }).min(1, "Quantity must be at least 1"),
  }),
});

export type CreateCartItemInput = z.infer<typeof CreateCartItemSchema>["body"];

// Validation schema for updating a cart item
export const UpdateCartItemSchema = object({
  params: object({
    cartItemId: string({
      required_error: "Cart Item ID is required",
    }),
  }),
  body: object({
    quantity: number({
      required_error: "Quantity is required",
    }).min(1, "Quantity must be at least 1"),
  }),
});

export type UpdateCartItemInput = {
  body: z.infer<typeof UpdateCartItemSchema>["body"];
  params: z.infer<typeof UpdateCartItemSchema>["params"];
};

// Validation schema for deleting a cart item
export const DeleteCartItemSchema = object({
  params: object({
    cartItemId: string({
      required_error: "Cart Item ID is required",
    }),
  }),
});

export type DeleteCartItemInput = z.infer<typeof DeleteCartItemSchema>["params"];

// Validation schema for getting a cart item by ID
export const GetCartItemSchema = object({
  params: object({
    cartItemId: string({
      required_error: "Cart Item ID is required",
    }),
  }),
});

export type GetCartItemInput = z.infer<typeof GetCartItemSchema>["params"];

// Validation schema for getting cart items by product ID
export const GetCartItemsByProductSchema = object({
  params: object({
    productId: string({
      required_error: "Product ID is required",
    }),
  }),
});

export type GetCartItemsByProductInput = z.infer<typeof GetCartItemsByProductSchema>["params"];
