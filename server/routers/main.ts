import { Router } from 'express';
import MAIN from '../action/main';

const mainRouter = Router();

mainRouter.post('/item-list', MAIN.actionGetItemList);
mainRouter.post('/bookmark', MAIN.actionBookMark);
mainRouter.get('/category', MAIN.actionGetCategory);
mainRouter.post('/item-list-user', MAIN.actionGetItemListByUser);
mainRouter.post('/GetItemListByCategory', MAIN.actionGetItemListByCategory);
mainRouter.post('/bookmark-list', MAIN.actionGetBookMarkList);
mainRouter.post('/GetUserLocation', MAIN.actionGetUserLocation);
mainRouter.post('/ChangeUserLocation', MAIN.actionChangeUserLocation);

export default mainRouter;
