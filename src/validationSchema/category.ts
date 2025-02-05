import { object, string, number, boolean, array, z } from "zod";

export const CategorySchema = object({
  body: object({
    name: string({
      required_error: "Title is required",
    }),
    image: string({
      required_error: "Image is required",
    }),
    description: string({
      required_error: "Description is required",
    }),
  }),
});

export type Category = z.infer<typeof CategorySchema>["body"];

export type CreateCategory = Omit<Category, "slug">;

// Get Category by Id
export const getCategoryById = object({
  params:object({
    id: string({
      required_error: "Category ID is required",
    })
  })
})

export type getCategoryByIdInput = z.infer<typeof getCategoryById>["params"];


// Get All Categories Schema
export const getAllCategoriesSchema = object({});
export type getAllCategoriesInput = z.infer<typeof getAllCategoriesSchema>;

// Update Category Schema
export const updateCategorySchema = object({
  body: object({
    name: string().optional(),
    description: string().optional(),
    imageUrl: string().optional(),
    slug: string().optional(),
  }),
  params:object({
    id: string({ required_error: "Category ID is required" }),
  })
});

export type updateCategoryInput = {
  body: z.infer<typeof updateCategorySchema>["body"];
  params: z.infer<typeof updateCategorySchema>["params"];
};

// Delete Category Schema
export const deleteCategorySchema = object({
  params: object({
    id: string({ required_error: "Category ID is required" }),
  }),
});

export type deleteCategoryInput = z.infer<typeof deleteCategorySchema>["params"];