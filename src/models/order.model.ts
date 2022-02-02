import { Schema, Types, model, Model } from 'mongoose';
import Item from '../types/item.type';
import Order from '../types/order.type';
import User from '../types/user.type';
import itemModel from './item.model';
import userModel from './user.model';

const orderSchema: Schema<Order> = new Schema<Order>({
  items: {
    type: [{ type: Types.ObjectId, ref: 'Item' }],
    validate: {
      validator: function (arr: [Types.ObjectId]) {
        return arr.length > 0;
      },
    },
  },
  client: {
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  },
  price: {
    type: Number,
  },
});

orderSchema.pre<Order>('save', async function (next) {
  const client: User | null = await userModel.findById(this.client);

  let price: number = 0;
  for (const item of this.items) {
    const itemFound: Item | null = await itemModel
      .findById(item)
      .select('price');
    price += itemFound?.price ?? 0;
  }
  if (client?.role === 'client-vip') {
    this.price = price * 0.9;
  } else {
    this.price = price;
  }
  next();
});

const orderModel: Model<Order> = model<Order>('Order', orderSchema);

export default orderModel;
