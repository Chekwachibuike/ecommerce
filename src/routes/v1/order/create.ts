import express from 'express';
// import { validate } from '../../../middleware/validate';
// import { createOrderValidationSchema } from '../../../validationSchema/order';
import OrderRepo from '../../../database/repository/orderRepo';

const createOrderHandler = async (req: express.Request, res: express.Response) => {
  try {
    const data = req.body;
    const order = await OrderRepo.createOrder(data);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
};

export default createOrderHandler;