import { object, string, number, array, z } from "zod";

export const CartSchema = object({
  body: object({
    userId: string({
      required_error: "User ID is required",
    }),
    cartItem: array(
      string({
        required_error: "Cart item ID is required",
      })
    ).optional().default([]), // References to CartItem IDs
    subTotal: number({
      required_error: "Subtotal must be a non-negative number",
    }).min(0, "Subtotal must be a non-negative number"),
  }),
});

export type Cart = z.infer<typeof CartSchema>["body"];

// Validation schema for adding an item to cart
export const AddToCartSchema = object({
  body: object({
    userId: string({
      required_error: "User ID is required",
    }),
    cartItemId: string({
      required_error: "Cart item ID is required",
    }), // Only storing the reference
  }),
});

export type AddToCartInput = z.infer<typeof AddToCartSchema>["body"];

// Validation schema for removing an item from cart
export const RemoveFromCartSchema = object({
  body: object({
    userId: string({
      required_error: "User ID is required",
    }),
    cartItemId: string({
      required_error: "Cart item ID is required",
    }),
  }),
});

export type RemoveFromCartInput = z.infer<typeof RemoveFromCartSchema>["body"];

// Validation schema for clearing the cart
export const ClearCartSchema = object({
  body: object({
    userId: string({
      required_error: "User ID is required",
    }),
  }),
});

export type ClearCartInput = z.infer<typeof ClearCartSchema>["body"];

// Validation schema for checking if an item exists in cart
export const IsItemInCartSchema = object({
  body: object({
    userId: string({
      required_error: "User ID is required",
    }),
    itemId: string({
      required_error: "Item ID is required",
    }),
  }),
});

export type IsItemInCartInput = z.infer<typeof IsItemInCartSchema>["body"];

// Validation schema for getting a cart by user ID
export const GetCartSchema = object({
  params: object({
    userId: string({
      required_error: "User ID is required",
    }),
  }),
});

export type GetCartInput = z.infer<typeof GetCartSchema>["params"];
