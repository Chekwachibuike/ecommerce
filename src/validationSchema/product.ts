import { object, string, number, boolean, array, z } from "zod";

export const ProductSchema = object({
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    feature: string().optional(),
    price: number({
      required_error: "Price is required",
    }).positive("Price must be a positive number"),
    category: array(
      string({ required_error: "must be an array of type string" })
    ),
    inStock: boolean().default(false),
    description: string({
      required_error: "Description is required",
    }),
    isFeatured: boolean().optional(),
    sku: number().optional(),
    quantity: number({
      required_error: "Quantity is required",
    }).positive("Quantity must be a positive number"),
    isActive: boolean().optional(),
    slug: string().optional(),
    inTheBox: string({
      required_error: "In the box is required",
    }),
    relatedCategories: array(string()).optional(),
    productGallery: array(
      string({ required_error: "Please include an image" })
    ),
  }),
});

export type Product = z.infer<typeof ProductSchema>["body"];

export type CreateProduct = Omit<Product, "slug" | "sku">;
export const getProductByIdSchema = object({
  params: object({
    id: string({
      required_error: "Product ID is required",
    }),
  }),
});

export type getProductByIdInput = z.infer<typeof getProductByIdSchema>["params"];

export const getProductsByCategoryIdSchema = object({
  params: object({
    id: string({
      required_error: "Category ID is required",
    }),
  }),
});

export type getProductsByCategoryIdInput = z.infer<
  typeof getProductsByCategoryIdSchema
>["params"];

export const updateProductByIdSchema = object({
  params: object({
    id: string({
      required_error: "Product ID is required",
    }),
  }),
  body: object({
    inStock: boolean().optional(),
    imageUrl: string().optional(),
    description: string().optional(),
    name: string().optional(),
    featured: boolean().optional(),
    price: number().optional(),
    bannerUrl: string().optional(),
    features: array(string()).optional(),
    sku: string().optional(),
    inTheBox: array(
      object({
        name: string(),
        quantity: number().int(),
      })
    ).optional(),
    slug: string().optional(),
    productGallery: array(string()).optional(),
    category: array(string()).optional(),
    relatedCategories: array(
      object({
        productId: string(),
        name: string(),
        imageUrl: string({
          required_error: "Product image URL is required",
        }),
      })
    ).optional(),
    quantity: number().int().optional(),
    active: boolean().optional(),
  }),
});

export type updateProductByIdInput = {
  body: z.infer<typeof updateProductByIdSchema>["body"];
  params: z.infer<typeof updateProductByIdSchema>["params"];
};

export const deleteProductByIdSchema = object({
  params: object({
    id: string({
      required_error: "Product ID is required",
    }),
  }),
});

export type deleteProductByIdInput = z.infer<
  typeof deleteProductByIdSchema
>["params"];




export const getAllProductsSchema = object({
  query: object({
    pageNumber: number().optional().default(1),
    pageSize: number().optional().default(10),
    sortField: string().optional(),
    sortType: z.enum(['asc', 'desc']).optional(),
    search: string().optional(),
    // Add other potential filter fields as needed
    inStock: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    category: string().optional(),
  })
});

export type getAllProductsInput = z.infer<typeof getAllProductsSchema>['query'];

