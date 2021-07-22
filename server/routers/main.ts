import { Router } from 'express';
import MAIN from '../action/main';
import { authJWT } from './middlewares';

const mainRouter = Router();

mainRouter.post('/item-list', authJWT, MAIN.actionGetItemList);
mainRouter.post('/bookmark', authJWT, MAIN.actionBookMark);
mainRouter.get('/category', authJWT, MAIN.actionGetCategory);
mainRouter.get('/item-list-user', authJWT, MAIN.actionGetItemListByUser);
mainRouter.post('/bookmark-list', authJWT, MAIN.actionGetBookMarkList);
mainRouter.post('/change-location', authJWT, MAIN.actionChangeUserLocation);
mainRouter.get('/user-location', authJWT, MAIN.actionGetUserLocation);
mainRouter.delete('/item', authJWT, MAIN.actionDeleteItem);

export default mainRouter;
