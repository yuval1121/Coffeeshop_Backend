import { Types } from 'mongoose';

export default interface User {
  email: string;
  name: string;
  password: string;
  role: Types.ObjectId;
  orders: [Types.ObjectId];
}
