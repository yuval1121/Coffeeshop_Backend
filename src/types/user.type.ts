import { Types } from 'mongoose';

export default interface User {
  email: string;
  name: string;
  password: string;
  role: string;
  orders: [Types.ObjectId] | undefined;
}
