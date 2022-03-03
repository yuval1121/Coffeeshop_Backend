import { Request, Response, Router } from 'express';
import { HydratedDocument } from 'mongoose';
import { authUser, authAdmin } from '../middleware/auth.mid';
import {
  createItem,
  deleteItem,
  getAllItems,
  getItemById,
  updateItem,
} from '../services/item.service';
import Item from '../types/item.type';
import { logger } from '../utils/logger';

const itemsRouter: Router = Router();

// @route   GET api/items/allitems
// @desc    Get all items on menu.
// @access  Public
itemsRouter.get('/allitems', async (req: Request, res: Response) => {
  try {
    const items: Item[] | null = await getAllItems();
    res.json(items);
  } catch (err) {
    logger.error(err);
    res.status(500).send('Server error');
  }
});

// @route   GET api/items/get/:id
// @desc    Get item from menu.
// @access  Public
itemsRouter.get('/get/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item: Item | null = await getItemById(id);
    res.json(item);
  } catch (err) {
    logger.error(err);
    res.status(500).send('Server error');
  }
});

// @route   POST api/items/add
// @desc    Add new item.
// @access  Admin
itemsRouter.post(
  '/add',
  authUser,
  authAdmin,
  async (req: Request, res: Response) => {
    const { name, price, alcoholic }: Item = req.body;

    try {
      const item: Item = await createItem({
        name,
        price,
        alcoholic,
      });

      res.json(item);
    } catch (error) {
      logger.error(error);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/items/update/:id
// @desc    Update item.
// @access  Admin
itemsRouter.put(
  '/update/:id',
  authUser,
  authAdmin,
  async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const newParams: object = req.body;
      const item: HydratedDocument<Item> | null = await updateItem(
        id,
        newParams
      );
      res.json(item);
    } catch (error) {
      logger.error(error);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/items/delete/:id
// @desc    Delete item.
// @access  Admin
itemsRouter.delete(
  '/:id',
  authUser,
  authAdmin,
  async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      await deleteItem(id);
      res.status(200).send('Item successfully deleted');
    } catch (error) {
      logger.error(error);
      res.status(500).send('Server Error');
    }
  }
);

export default itemsRouter;
