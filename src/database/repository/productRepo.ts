import { FilterQuery, QueryOptions, Types } from "mongoose";
import ProductModel, { Product } from "../models/product";
import CategoryModel from "../models/category";
import { DocumentType } from "@typegoose/typegoose";

class ProductRepository {
  // Create a new product with category validation
  async createProduct(input: Partial<Product>): Promise<DocumentType<Product>> {
    try {
      // Check if categories exist
      if (!input.category || !Array.isArray(input.category) || input.category.length === 0) {
        throw new Error("At least one category is required");
      }

      // Validate all category IDs exist
      const categoryIds = input.category.map(id => 
        typeof id === 'string' ? id : id.toString()
      );
      
      const categoriesCount = await CategoryModel.countDocuments({
        _id: { $in: categoryIds }
      });

      if (categoriesCount !== categoryIds.length) {
        throw new Error("One or more category IDs are invalid");
      }

      const product = await ProductModel.create(input);
      return await product.populate("category");
    } catch (error: any) {
      throw new Error(`Error creating product: ${error.message}`);
    }
  }

  // Get all products with optional filtering, pagination, and sorting
  async getAllProducts(
    filter: FilterQuery<Product> = {},
    options: QueryOptions = { lean: true }
  ): Promise<Array<DocumentType<Product>>> {
    try {
      const products = await ProductModel.find(filter, {}, options)
        .populate("category")
        .exec();
      return products;
    } catch (error: any) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }

  // Get product by ID
  async getProductById(id: string): Promise<DocumentType<Product> | null> {
    try {
      const product = await ProductModel.findById(id).populate("category").exec();
      return product;
    } catch (error: any) {
      throw new Error(`Error fetching product by ID: ${error.message}`);
    }
  }

  // Get product by slug
  async getProductBySlug(slug: string): Promise<DocumentType<Product> | null> {
    try {
      const product = await ProductModel.findOne({ slug }).populate("category").exec();
      return product;
    } catch (error: any) {
      throw new Error(`Error fetching product by slug: ${error.message}`);
    }
  }

  // Get product by SKU
  async getProductBySku(sku: number): Promise<DocumentType<Product> | null> {
    try {
      const product = await ProductModel.findOne({ sku }).populate("category").exec();
      return product;
    } catch (error: any) {
      throw new Error(`Error fetching product by SKU: ${error.message}`);
    }
  }

  // Update product by ID with category validation
  async updateProduct(
    id: string,
    update: Partial<Product>
  ): Promise<DocumentType<Product> | null> {
    try {
      // If categories are being updated, validate them
      if (update.category) {
        if (!Array.isArray(update.category) || update.category.length === 0) {
          throw new Error("At least one category is required");
        }

        const categoryIds = update.category.map(id => 
          typeof id === 'string' ? id : id.toString()
        );
        
        const categoriesCount = await CategoryModel.countDocuments({
          _id: { $in: categoryIds }
        });

        if (categoriesCount !== categoryIds.length) {
          throw new Error("One or more category IDs are invalid");
        }
      }

      const product = await ProductModel.findByIdAndUpdate(
        id,
        { $set: update },
        { new: true }
      ).populate("category").exec();
      
      return product;
    } catch (error: any) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  // Delete product by ID
  async deleteProduct(id: string): Promise<DocumentType<Product> | null> {
    try {
      const product = await ProductModel.findByIdAndDelete(id).exec();
      return product;
    } catch (error: any) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }

  // Get featured products
  async getFeaturedProducts(limit: number = 10): Promise<Array<DocumentType<Product>>> {
    try {
      const products = await ProductModel.find(
        { isFeatured: true },
        {},
        { limit }
      ).populate("category").exec();
      return products;
    } catch (error: any) {
      throw new Error(`Error fetching featured products: ${error.message}`);
    }
  }

  // Get products by category ID (includes products with the category in their array)
  async getProductsByCategory(
    categoryId: string | Types.ObjectId
  ): Promise<Array<DocumentType<Product>>> {
    try {
      // First verify the category exists
      const categoryExists = await CategoryModel.exists({ _id: categoryId });
      if (!categoryExists) {
        throw new Error("Category not found");
      }

      const products = await ProductModel.find({
        category: categoryId,
      }).populate("category").exec();
      return products;
    } catch (error: any) {
      throw new Error(`Error fetching products by category: ${error.message}`);
    }
  }

  // Search products by title or description
  async searchProducts(
    searchTerm: string
  ): Promise<Array<DocumentType<Product>>> {
    try {
      const products = await ProductModel.find({
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
        ],
      }).populate("category").exec();
      return products;
    } catch (error: any) {
      throw new Error(`Error searching products: ${error.message}`);
    }
  }

  // Get products by price range
  async getProductsByPriceRange(
    minPrice: number,
    maxPrice: number
  ): Promise<Array<DocumentType<Product>>> {
    try {
      const products = await ProductModel.find({
        price: { $gte: minPrice, $lte: maxPrice },
      }).populate("category").exec();
      return products;
    } catch (error: any) {
      throw new Error(`Error fetching products by price range: ${error.message}`);
    }
  }

  // Get in-stock products
  async getInStockProducts(): Promise<Array<DocumentType<Product>>> {
    try {
      const products = await ProductModel.find({
        inStock: true,
        quantity: { $gt: 0 },
      }).populate("category").exec();
      return products;
    } catch (error: any) {
      throw new Error(`Error fetching in-stock products: ${error.message}`);
    }
  }

  // Update stock quantity
  async updateStockQuantity(
    id: string,
    quantity: number
  ): Promise<DocumentType<Product> | null> {
    try {
      const product = await ProductModel.findByIdAndUpdate(
        id,
        {
          $set: {
            quantity,
            inStock: quantity > 0,
          },
        },
        { new: true }
      ).populate("category").exec();
      return product;
    } catch (error: any) {
      throw new Error(`Error updating stock quantity: ${error.message}`);
    }
  }
  // Get paginated products with filtering, sorting, and search
  async getPaginatedProduct({
    pageNumber = 1,
    pageSize = 10,
    filter: _filter = {},
    sortLogic = { createdAt: -1 },
    search,
  }: Partial<{ pageNumber: number; pageSize: number; filter: FilterQuery<Product>; sortLogic: any; search: string; }>): Promise<Array<DocumentType<Product>>> {
    try {
      const filter = {
        ..._filter,
        ...(search ? { title: { $regex: search, $options: "i" } } : {}),
      };
      const products = await ProductModel.find(filter)
        .sort(sortLogic)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .populate("category")
        .exec();  // Removed `lean()` here to preserve the Mongoose document features
      return products;
    } catch (error: any) {
      throw new Error(`Error fetching paginated products: ${error.message}`);
    }
  }

  // Get related products by categories
  async getRelatedProducts(
    productId: string,
    limit: number = 5
  ): Promise<Array<DocumentType<Product>>> {
    try {
      const product = await ProductModel.findById(productId);
      if (!product) throw new Error("Product not found");

      const relatedProducts = await ProductModel.find({
        _id: { $ne: productId },
        $or: [
          { category: { $in: product.category } },
          { relatedCategories: { $in: product.relatedCategories } },
        ],
      })
        .limit(limit)
        .populate("category")
        .exec();

      return relatedProducts;
    } catch (error: any) {
      throw new Error(`Error fetching related products: ${error.message}`);
    }
    
  }
}

export default new ProductRepository();