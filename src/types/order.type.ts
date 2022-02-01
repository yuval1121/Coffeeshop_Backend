import { Types } from 'mongoose';

export default interface Order {
  items: [Types.ObjectId];
  client: Types.ObjectId;
  price: number;
}
