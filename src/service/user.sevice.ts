import userModel from '../models/user.model';
import User from '../types/user.type';
import { logger } from '../utils/logger';
import bcrypt from 'bcryptjs';

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
) {
  return bcrypt.compare(candidatePassword, hashedPassword).catch(() => false);
}
