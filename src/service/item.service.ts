import itemModel from '../models/item.model';
import Item from '../types/item.type';

export async function createItem(input: Item) {
  return await itemModel.create<Item>(input);
}

export async function updateItem(id: string, newParams: object) {
  return await itemModel.findByIdAndUpdate(id, newParams, { new: true });
}

export async function deleteItem(id: string) {
  await itemModel.findByIdAndDelete(id);
}
