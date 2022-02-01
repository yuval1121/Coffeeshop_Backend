import {
  Schema,
  model,
  Types,
  Model,
  HydratedDocument,
  CallbackError,
} from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../types/user.type';

const userSchema: Schema<User> = new Schema<User>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, default: 'client' },
  orders: { type: [Types.ObjectId], ref: 'Order' },
});

userSchema.pre(
  'save',
  async function (
    this: HydratedDocument<User>,
    next: (err?: CallbackError | undefined) => void
  ) {
    if (!this.isModified('password')) return next();

    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

    next();
  }
);

const userModel: Model<User> = model<User>('User', userSchema);

export default userModel;
