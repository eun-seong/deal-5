import { Router } from 'express';
import MAIN from '../action/main';

const mainRouter = Router();

mainRouter.post('/action-get-item-list', MAIN.actionGetItemList);
mainRouter.post('/action-bookmark', MAIN.actionBookMark);
mainRouter.post('/actionGetItemListByUser', MAIN.actionGetItemListByUser);
mainRouter.post('/actionGetItemListByCategory', MAIN.actionGetItemListByCategory);
mainRouter.post('/actionGetBookMarkList', MAIN.actionGetBookMarkList);
mainRouter.post('/actionGetCategory', MAIN.actionGetCategory);
mainRouter.post('/actionGetUserLocation', MAIN.actionGetUserLocation);
mainRouter.post('/actionChangeUserLocation', MAIN.actionChangeUserLocation);

export default mainRouter;
