import express from 'express';
// import { validate } from '../../../middleware/validate';
// import { updateOrderByIdValidationSchema } from '../../../validationSchemas/order/updateOrderByIdValidationSchema';
import OrderRepo from '../../../database/repository/orderRepo';

const updateOrderByIdHandler = async (req: express.Request, res: express.Response) => {
  try {
    const orderId = req.params.orderId;
    const updateData = req.body;
    const order = await OrderRepo.updateOrderById(orderId, updateData);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: 'Order not found' });
  }
};

export default updateOrderByIdHandler;