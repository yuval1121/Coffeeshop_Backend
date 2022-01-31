import { Schema, model, Types, Model } from 'mongoose';
import User from '../types/user.type';

const userSchema: Schema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: Types.ObjectId, ref: 'Role' },
    orders: { type: [Types.ObjectId], ref: 'Order' },
  },
  { timestamps: true }
);

const userModel: Model<User> = model<User>('User', userSchema);

export default userModel;
