import express from 'express';
// import { validate } from '../../../middleware/validate';
// import { deleteOrderByIdValidationSchema } from '../../../validationSchemas/order/deleteOrderByIdValidationSchema';
import OrderRepo from '../../../database/repository/orderRepo';

const deleteOrderByIdHandler = async (req: express.Request, res: express.Response) => {
  try {
    const orderId = req.params.orderId;
    const result = await OrderRepo.deleteOrderById(orderId);
    if (result) {
      res.status(204).json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order' });
  }
};

export default deleteOrderByIdHandler;