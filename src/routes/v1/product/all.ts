import { Request, Response } from "express";
import { getAllProductsInput } from "../../../validationSchema/product";
import ProductRepository from "../../../database/repository/productRepo";
import APIResponse from "../../../utils/api";
import { FilterQuery } from "mongoose";
import { Product } from "../../../database/models/product";

const getAllProductsHandler = async (
  req: Request<{}, {}, {}, getAllProductsInput>,
  res: Response
) => {
  try {
    const {
      pageNumber = 1,
      pageSize = 10,
      sortField,
      sortType = 'asc',
      search,
      inStock,
      isFeatured,
      category
    } = req.query;

    // Build filter object
    const filter: FilterQuery<Product> = {};
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (typeof inStock === 'boolean') filter.inStock = inStock;
    if (typeof isFeatured === 'boolean') filter.isFeatured = isFeatured;
    if (category) filter.category = category;

    // Build options object
    const options = {
      lean: true,
      skip: (pageNumber - 1) * pageSize,
      limit: pageSize,
      sort: sortField ? { [sortField]: sortType === 'asc' ? 1 : -1 } : undefined
    };

    const products = await ProductRepository.getAllProducts(filter, options);
    
    // If no products found with the given criteria
    if (products.length === 0) {
      return APIResponse.error("No products found", 404).send(res);
    }

    return APIResponse.success(products, 200).send(res);
  } catch (error: any) {
    console.error("Error in getAllProductsHandler:", error);
    return APIResponse.error("Failed to fetch products", 500).send(res);
  }
};

export default getAllProductsHandler;