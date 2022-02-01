import { Schema, model, Model } from 'mongoose';
import Item from '../types/item.type';

const itemSchema: Schema<Item> = new Schema<Item>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  alcoholic: {
    type: Boolean,
    default: null,
  },
});

const itemModel: Model<Item> = model<Item>('Item', itemSchema);

export default itemModel;
