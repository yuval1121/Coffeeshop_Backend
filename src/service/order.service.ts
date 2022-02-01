import itemModel from '../models/item.model';
import orderModel from '../models/order.model';
import Order from '../types/order.type';

export async function createOrder(order: Order) {
  for (const item of order.items) {
    if (!(await itemModel.findById(item))) {
      throw new Error('Item does not exist');
    }
  }
  return await orderModel.create<Order>(order);
}
