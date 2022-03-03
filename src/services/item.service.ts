import { Types } from 'mongoose';
import itemModel from '../models/item.model';
import Item from '../types/item.type';

export async function getItemById(id: string | Types.ObjectId) {
  return itemModel.findById(id);
}

export async function createItem(input: Item) {
  return itemModel.create<Item>(input);
}

export async function updateItem(id: string, newParams: object) {
  return itemModel.findByIdAndUpdate(id, newParams, { new: true });
}

export async function deleteItem(id: string | Types.ObjectId) {
  await itemModel.findByIdAndDelete(id);
}

export async function getAllItems() {
  return itemModel.find();
}
