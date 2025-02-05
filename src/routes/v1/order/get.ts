import express from 'express';
import OrderRepo from '../../../database/repository/orderRepo';

const getOrdersByUserHandler = async (req: express.Request, res: express.Response) => {
  try {
    const userId = req.params.userId;
    const orders = await OrderRepo.getOrdersByUser(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: 'Orders not found' });
  }
};
export default getOrdersByUserHandler;