import mongoose from 'mongoose';
import config from 'config';

const connectDB = async () => {
  const dbUri: string = config.get<string>('mongoURI');
  try {
    await mongoose.connect(dbUri);
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export { connectDB };
