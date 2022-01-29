import mongoose from 'mongoose';
import config from 'config';
import { logger } from '../src/utils/logger';

const connectDB: () => Promise<void> = async () => {
  const dbURI: string = config.get<string>('mongoURI');
  try {
    await mongoose.connect(dbURI);
    logger.info('MongoDB Connected...');
  } catch (error) {
    logger.error('Error occured when connecting to mongo', error);
    process.exit(1);
  }
};

export { connectDB };
