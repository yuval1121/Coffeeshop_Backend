import userModel from '../models/user.model';
import User from '../types/user.type';
import bcrypt from 'bcryptjs';
import { logger } from '../utils/logger';

export async function createUser(input: User) {
  try {
    return await userModel.create<User>(input);
  } catch (e: any) {
    logger.error('Error when creating user');
    throw new Error(e);
  }
}

export async function validatePassword(
  candidatePassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt
    .compare(candidatePassword, hashedPassword)
    .catch(() => false);
}
