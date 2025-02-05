import { object, string, number, TypeOf } from "zod";

export const CreateBillingInfoSchema = object({
  body: object({
    userId: string({
      required_error: "User ID is required",
    }).min(1),
    
    address: string({
      required_error: "Address is required",
    }).min(1),
    
    country: string({
      required_error: "Country is required",
    }).min(2, "Country must be at least 2 characters"),
    
    zipCode: string({
      required_error: "ZIP code is required",
    }).min(3),
    
    postalCode: string({
      required_error: "Postal code is required",
    }).min(3),
  }),
});

export const UpdateBillingInfoSchema = object({
  body: object({
    userId: string().min(1).optional(),
    address: string().min(1).optional(),
    country: string().min(2).optional(),
    zipCode: string().min(3).optional(),
    postalCode: string().min(3).optional(),
  }),
});

export const PaginationSchema = object({
  params: object({
    page: number().int().min(1).optional().default(1),
    limit: number().int().min(1).max(100).optional().default(10),
  }),
});

export const UserIdSchema = object({
  params: object({
    userId: string({
      required_error: "User ID is required",
    }).min(1),
  }),
});

export const GetByUserIdSchema = UserIdSchema;
export const DeleteBillingInfoSchema = UserIdSchema;

export const GetAllBillingInfoSchema = object({
  params: object({
    page: number().int().min(1).optional().default(1),
    limit: number().int().min(1).max(100).optional().default(10),
  }),
});

export type CreateBillingInfoType = TypeOf<typeof CreateBillingInfoSchema>["body"];
export type UpdateBillingInfoType = TypeOf<typeof UpdateBillingInfoSchema>["body"];
export type PaginationType = TypeOf<typeof PaginationSchema>["params"];
export type GetByUserIdType = TypeOf<typeof GetByUserIdSchema>["params"];
export type DeleteBillingInfoType = TypeOf<typeof DeleteBillingInfoSchema>["params"];
export type GetAllBillingInfoType = TypeOf<typeof GetAllBillingInfoSchema>["params"];

