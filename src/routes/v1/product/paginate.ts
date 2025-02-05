import { Router } from "express";
import { Request, Response } from "express";
import APIResponse from "../../../utils/api";
import ProductRepo from "../../../database/repository/productRepo";

const fetchProductHandler: (
  req: Request,
  res: Response
) => Promise<void> = async (req, res) => {
  try {
    const {
      pageNumber,
      pageSize,
      sortField,
      sortType,
      search,
      ...rest
    } = req.query;
    const filter = {
      ...(rest && rest)
    };

    const sortLogic =
      sortField && sortType
        ? {
            [sortField as string]: sortType as string | number,
          }
        : undefined;

    const products = await ProductRepo.getPaginatedProduct({
      pageNumber: Number(pageNumber),
      pageSize: Number(pageSize),
      filter,
      search: search as string,
      sortLogic,
    });
    APIResponse.success(products, 200).send(res);
  } catch (error) {
    APIResponse.error((error as Error).message).send(res);
  }
};
export default fetchProductHandler;
