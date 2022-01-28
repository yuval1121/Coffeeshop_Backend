import mongoose from 'mongoose';
import config from 'config';
import { logger } from '../src/utils/logger';

const connectDB = async () => {
  const dbUri: string = config.get<string>('mongoURI');
  try {
    await mongoose.connect(dbUri);
    logger.info('MongoDB Connected...');
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

export { connectDB };
