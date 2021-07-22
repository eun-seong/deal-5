import { Router } from 'express';
import ITEM_DETAIL from '../action/itemdetail';
import { authJWT } from './middlewares';

const itemRouter = Router();

itemRouter.post('/item', authJWT, ITEM_DETAIL.actionGetItemDetail);
itemRouter.post('/view', ITEM_DETAIL.actionView);
itemRouter.get('/sales-type', ITEM_DETAIL.actionSalesType);
itemRouter.post('/item-sales-type', authJWT, ITEM_DETAIL.actionUpdateItemSalesType);

export default itemRouter;
