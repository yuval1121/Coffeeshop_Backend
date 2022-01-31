import userModel from '../models/user.model';
import User from '../types/user.type';

export async function createUser(input: User) {
  try {
    return await userModel.create<User>(input);
  } catch (e: any) {
    throw new Error(e);
  }
}
