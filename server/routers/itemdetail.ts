import { Router } from 'express';
import ITEM_DETAIL from '../action/itemdetail';
import { authJWT } from './middlewares';

const itemRouter = Router();

itemRouter.post('/item', authJWT, ITEM_DETAIL.actionGetItemDetail);
itemRouter.post('/view', ITEM_DETAIL.actionView);

export default itemRouter;
