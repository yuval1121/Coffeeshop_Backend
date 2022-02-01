import mongoose from 'mongoose';
import config from 'config';
import userModel from '../src/models/user.model';
import { logger } from '../src/utils/logger';
import { createUser } from '../src/service/user.service';

const connectDB: () => Promise<void> = async () => {
  const dbURI: string = config.get<string>('mongoURI');
  try {
    await mongoose.connect(dbURI);
    logger.info('MongoDB Connected...');

    if ((await userModel.estimatedDocumentCount()) === 0) {
      await createUser({
        name: 'admin',
        email: 'admin@admin.com',
        password: '123456',
        role: 'admin',
        orders: undefined,
      });
      await createUser({
        name: 'client',
        email: 'client@client.com',
        password: '123456',
        role: 'client',
        orders: undefined,
      });
    }
  } catch (error) {
    logger.error('Error occured when connecting to mongo');
    process.exit(1);
  }
};

export { connectDB };
