import { Types } from 'mongoose';

export interface Order {
  items: [Types.ObjectId];
  client: Types.ObjectId;
  price: number;
  done: boolean;
}
