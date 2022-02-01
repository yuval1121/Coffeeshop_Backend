import orderModel from '../models/order.model';
import Order from '../types/order.type';

export async function createOrder(input: Order) {
  return await orderModel.create<Order>(input);
}
